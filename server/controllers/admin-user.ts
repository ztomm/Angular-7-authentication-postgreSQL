import * as bcrypt from 'bcryptjs';
import UtilsController from './utils';

import * as db from '../models';

export default class AdminUserController extends UtilsController{
  
  private modelUser = db.User;

  constructor(){
    super();
    super._setParams({'model':this.modelUser});
  }

  count = (req, res) => {
    return super._count(req, res, this.modelUser, {});
  }

  findAndCountAll = (req, res) => {
    return super._findAndCountAll(req, res, this.modelUser, {
      attributes: ['id','active', 'username', 'email', 'roleId'],
      order: [
        ['id', 'ASC']
      ],
    });
  }
  
  findAll = (req, res) => {
    return super._findAll(req, res, this.modelUser, {
      attributes: ['id','active', 'username', 'email', 'roleId'],
      order: [
        ['id', 'ASC']
      ],
    });
  }

  findById = (req, res) => {
    return super._findById(req, res, this.modelUser, {
      id: req.params.id,
      options: {
        attributes: ['id','active', 'username', 'email', 'roleId']
      }
    });
  }

  findOne = (req, res) => {
    return super._findOne(req, res, this.modelUser, {
      attributes: ['id','active', 'username', 'email', 'roleId']
    });
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

  update = (req, res) => {
    let fields = [
      "active",
      "email",
      "roleId"
    ];
    if(req.body.username != ''){
      fields.push("username");
    }
    if(req.body.password != ''){
      let salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      fields.push("password");
    }
    return super._update(req, res, this.modelUser, {
      fields: fields,
      conditions: {
        $and: {
          id: req.params.id,
        }
      }
    });
  }

  destroy = (req, res) => {
    return super._destroy(req, res, this.modelUser, {
      where: {id: req.params.id}
    });
  }

}