import * as bcrypt from 'bcryptjs';
import UtilsController from './utils';

import * as db from '../models';

export default class UserAccountController extends UtilsController{
  
  private modelUser = db.User;
  private modelUserRole = db.UserRole;

  constructor(){
    super();
    super._setParams({'model':this.modelUser});
  }

  findById = (req, res) => {
    return super._findById(req, res, this.modelUser, {
      id: req['userObj'].id,
      options: {
        attributes: ['id','active', 'username', 'email', 'roleId'],
        where: {userId: req['userObj'].id},
      }
    });
  }

  update = (req, res) => {
    let fields = [
      "email"
    ];
    // if(req.body.username != ''){
    //   fields.push("username");
    // }
    if(req.body.password != ''){
      let salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      fields.push("password");
    }
    return super._update(req, res, this.modelUser, {
      fields: fields,
      conditions: {
        $and: {
          id: req['userObj'].id,
        }
      }
    });
  }

}