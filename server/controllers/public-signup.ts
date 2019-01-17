import * as bcrypt from 'bcryptjs';
import UtilsController from './utils';

import * as db from '../models';

export default class PublicSignupController extends UtilsController{

  private modelUser = db.User;
  private modelUserRole = db.UserRole;

  constructor(){
    super();
    super._setParams({'model':this.modelUser});
  }

  signup = (req, res) => {
    this.modelUser
    .findOne({ 
      where: {
        [this.Op.or]: {
          username: req.body.username,
          email: req.body.email
        }
      }
    })
    .then((result) => {
      if (result) {
        if (result.username == req.body.username) {
          return res.status(400).send('username exist');
        }
        if (result.email == req.body.email) {
          return res.status(400).send('email exist');
        }
      }
      if (!result) {
        let salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        return this.create(req, res);
      }
    })
    .catch((error) => res.status(400).send(error));
  }

  create = (req, res) => {
    let data = {
      active: req.body.active,
      username: req.body.username,
      email: req.body.email,
      password: '',
      roleId: 1
    }
    if(req.body.password != ''){
      let salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(req.body.password, salt);
    }
    if(req.body.roleId != ''){
      data.roleId = req.body.roleId;
    }
    return super._create(req, res, this.modelUser, data);
  }
  
}