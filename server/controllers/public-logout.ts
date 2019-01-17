import UtilsController from './utils';

import AuthController from './auth';

import * as db from '../models';

export default class publicLogoutController extends UtilsController{
  
  private modelUser = db.User;

  private authController = new AuthController();

  constructor(){
    super();
    super._setParams({'model':this.modelUser});
  }

  logout = (req, res) => {
    return this.authController.deleteSession(req, res).then(result => {
      if(result){
        res.status(200).json({logout: true});
      }
      else{
        res.status(403).send({
          message: 'DB error',
        });
      }
    });

  }

}