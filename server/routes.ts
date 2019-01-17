import * as config from 'config';
import * as express from 'express';
import * as uuidv4 from 'uuid/v4';

import AuthController from './controllers/auth';

import AdminUserController from './controllers/admin-user';
import AdminUserRoleController from './controllers/admin-user-role';

import UserAccountController from './controllers/user-account';
import UserTodoController from './controllers/user-todo';

import PublicHomeController from './controllers/public-home';
import PublicLoginController from './controllers/public-login';
import PublicLogoutController from './controllers/public-logout';
import PublicSignupController from './controllers/public-signup';

export default function setRoutes(app) {

  const router = express.Router();
    
  const authController = new AuthController();

  const adminUserRoleController = new AdminUserRoleController();
  const adminUserController = new AdminUserController();

  const userAccountController = new UserAccountController();
  const userTodoController = new UserTodoController();

  const publicHomeController = new PublicHomeController();
  const publicLoginController = new PublicLoginController();
  const publicLogoutController = new PublicLogoutController();
  const publicSignupController = new PublicSignupController();

  const superAdminAccess = {
    id: 0,
    username: 'superAdmin',
    roleId: 4,
    loggedIn: false
  }

  const adminAccess = {
    id: 0,
    username: 'admin',
    roleId: 3,
    loggedIn: false
  }

  const userAccess = {
    id: 0,
    username: 'user',
    roleId: 2,
    loggedIn: false
  }

  const publicAccess = {
    id: 0,
    username: 'guest',
    roleId: 1,
    loggedIn: false
  }

  const superAdminHelperAccess = {
    roleId: 4,
  }

  const adminHelperAccess = {
    roleId: 3,
  }

  const userHelperAccess = {
    roleId: 2,
  }

  const publicHelperAccess = {
    roleId: 1,
  }

  app.use(function (req, res, next) {
    authController.clearSession(req,res);
    next();
  });

  app.use(function (req, res, next) {
    if (req.url.startsWith('/api/public/login')) {
      next();
      return;
    }
    if (req.url.startsWith('/api/public/logout')) {
      next();
      return;
    }
    if (req.url.startsWith('/api/public/')) {
      next();
      return;
    }
    req['data'] = {};
    req['userObj'] = {
      id: publicAccess.id,
      username: publicAccess.username,
      roleId: publicAccess.roleId,
      loggedIn: publicAccess.loggedIn,
    };
    req['tokenObj'] = {}
    req['breakRoute'] = false;
    if(req.headers.tokenid && req.headers.tokenid != ''){
      authController.updateSession(req, res).then(result => {
        if(result == true){
          next();
          return;
        }
        else{
          req['breakRoute'] = true;
          req.tokenObj.action = [
            ['logout', ''],
            ['redirect', '/'],
          ];
          next();
          return;
        }
      });
    }
  });

  app.use(function (req, res, next) {
    if(req['breakRoute']){
      return res.status(200).json({tokenObj: req.tokenObj});
    }
    next();
  });

  app.use(function (req, res, next) {
    if (req.url.startsWith('/api/admin')) {
      if(!req['userObj'].loggedIn || req['userObj'].roleId < adminAccess.roleId){
        req.tokenObj.action = [
          ['logout', ''],
          ['redirect', '/'],
        ];
        return res.status(403).json({tokenObj:req.tokenObj});
      }
    }
    if (req.url.startsWith('/api/user')) {
      if(!req['userObj'].loggedIn || req['userObj'].roleId < userAccess.roleId){
        req.tokenObj.action = [
          ['logout', ''],
          ['redirect', '/'],
        ];
        return res.status(403).json({tokenObj:req.tokenObj});
      }
    }
    if (req.url.startsWith('/api/helper/superadmin')) {
      if(!req['userObj'].loggedIn || req['userObj'].roleId < superAdminHelperAccess.roleId){
        req.tokenObj.action = [
          ['logout', ''],
          ['redirect', '/'],
        ];
        return res.status(403).json({tokenObj:req.tokenObj});
      }
    }
    if (req.url.startsWith('/api/helper/admin')) {
      if(!req['userObj'].loggedIn || req['userObj'].roleId < adminHelperAccess.roleId){
        req.tokenObj.action = [
          ['logout', ''],
          ['redirect', '/'],
        ];
        return res.status(403).json({tokenObj:req.tokenObj});
      }
    }
    if (req.url.startsWith('/api/helper/user')) {
      if(!req['userObj'].loggedIn || req['userObj'].roleId < userHelperAccess.roleId){
        req.tokenObj.action = [
          ['logout', ''],
          ['redirect', '/'],
        ];
        return res.status(403).json({tokenObj:req.tokenObj});
      }
    }
    next();
  });

  // ----------------------------------------------------
  // ADMIN
  // ----------------------------------------------------
  // userRoles
  router.route('/admin/user-roles').get(adminUserRoleController.findAll);
  router.route('/admin/user-role/:id').get(adminUserRoleController.findById);
  router.route('/admin/user-roles/count').get(adminUserRoleController.count);
  router.route('/admin/user-role').post(adminUserRoleController.create);
  router.route('/admin/user-role/:id').put(adminUserRoleController.update);
  router.route('/admin/user-role/:id').delete(adminUserRoleController.destroy);
  // ----------------------------------------------------
  // user
  router.route('/admin/users').get(adminUserController.findAll);
  router.route('/admin/user/:id').get(adminUserController.findById);
  router.route('/admin/users/count').get(adminUserController.count);
  router.route('/admin/user').post(adminUserController.create);
  router.route('/admin/user/:id').put(adminUserController.update);
  router.route('/admin/user/:id').delete(adminUserController.destroy);
  // ----------------------------------------------------

  // ----------------------------------------------------
  // USER
  // ----------------------------------------------------
  // userAccount
  router.route('/user/account/:id').get(userAccountController.findById);
  router.route('/user/account/:id').put(userAccountController.update);
  // todos
  router.route('/user/todos').get(userTodoController.findAll);
  router.route('/user/todos/count').get(userTodoController.count);
  router.route('/user/todo').post(userTodoController.create);
  router.route('/user/todo/:id').get(userTodoController.findById);
  router.route('/user/todo/:id').put(userTodoController.update);
  router.route('/user/todo/:id').delete(userTodoController.destroy);
  // ----------------------------------------------------  

  // ----------------------------------------------------
  // PUBLIC
  // ----------------------------------------------------
  // Home
  router.route('/public/home/init').get(publicHomeController.initHome);
  // ----------------------------------------------------
  // login
  router.route('/public/login').post(publicLoginController.login);
  // ----------------------------------------------------
  // logout
  router.route('/public/logout').post(publicLogoutController.logout);
  // ----------------------------------------------------
  // signup
  router.route('/public/signup').post(publicSignupController.signup);
  // ----------------------------------------------------

  // apply the routes to our lication with the prefix /api
  app.use('/api', router);

}
