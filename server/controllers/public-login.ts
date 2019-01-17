import * as bcrypt from 'bcryptjs';
import UtilsController from './utils';

import AuthController from './auth';

import * as db from '../models';

export default class publicLoginController extends UtilsController{
  
  private modelSystem = db.System;
  private modelUser = db.User;
  private modelUserRole = db.UserRole;

  private authController = new AuthController();

  constructor(){
    super();
    super._setParams({'model':this.modelUser});
  }
  
  login = (req, res) => {
	  return this._login(req, res);
  }

  async _login(req, res){
	let systemVars = await this.modelSystem
    .findById(1).then(result => {return result}).catch(error => {return false});
    this.modelUser.belongsTo(this.modelUserRole, {foreignKey: 'roleId'});
    this.modelUser
      .findOne({ 
        where: {
          email: req.body.email.toLowerCase()
        },
        include: [
          { model: this.modelUserRole },
        ]
      })
      .then(result => {
        if (!result) {
          return res.status(403).send({
            message: 'User not found',
          });
        }
        let isMatch = bcrypt.compareSync(req.body.password, result.password);
        if (isMatch) {
			if(result.roleId < 3 && systemVars['userLoginActive'] == '0'){
				return res.status(403).send({
					message: 'Access denied',
				});
			}
			let userParams = {
				id: result.id,
				username: result.username,
				email: result.email,
				roleId: result.roleId,
				loggedIn: true,
			};
			return this.authController.createSession(req, res, userParams).then(result => {
				if(result){
					res.status(200).json({data:{},tokenObj:req['tokenObj']});
				}
				else{
				  return res.status(403).send({
					message: 'DB error',
				  });
				}
			});
		}
		else{
			return res.status(403).send({
				message: 'Password invalid',
			});
		}
	})
	.catch((error) => res.status(403).send(error));
  }
  
}