import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as uuidv4 from 'uuid/v4';

import * as db from '../models';

export default class AuthController{
  
  private model = db.UserSession;

  constructor(){}

  async createSession(req, res, userParams){
    let tokenId = uuidv4();
    let token = jwt.sign(userParams, config.token.secret);
    return this.model.create({
      tokenId: tokenId,
      token: token,
      userId: userParams.id,
      userName: userParams.username,
      userRoleId: userParams.roleId,
      ip: req.headers['x-real-ip'],
      expire: new Date(new Date().getTime() + (config.token.expireTime)),
      loggedIn: userParams.loggedIn,
      requestUrlBevorLogin: ''
    })
    .then(result => {
      req['tokenObj'] = {
        tokenId: tokenId,
        token: token
      }
      return true;
    })
    .catch(error => {
      return false
    });
  }

  async updateSession(req, res){
    return this.model.findOne({
      where: {
        $and: {
          tokenId: req.headers.tokenid,
          expire: {
            $gt: new Date()
          }
        }
      }
    })
    .then(result => {
      if (!result) {
        return 'token not found';
      }
      if (result.expire < (new Date())) {
        return 'token expired';
      }
      req['userObj'] = {
        id: result.userId,
        username: result.username,
        roleId: result.userRoleId,
        loggedIn: result.loggedIn,
      };
      let updateUserSession = this.model
      .update(
        {expire: new Date(Date.now() + config.token.expireTime)},
        {where: {id: result.id}})
      .then(function() {return true;})
	  .catch(error => {return false});
	  return true;
    })
    .catch(error => {return false});
  }

  async deleteSession(req, res){
    return this.model
    .destroy({
      where: { 
        tokenId: req.headers.tokenid
      }
    })
    .then(function() {return true})
    .catch(error => {return false});
  }

  clearSession(req,res){
    return this.model
    .destroy({
      where: { 
        expire: {
          $lt: new Date()
        }
      }
    }).then(result => {
      return true;
    })
    .catch(error => res.status(400).send(error));
  }

}