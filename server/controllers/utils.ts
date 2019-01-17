import * as db from '../models';

export default class UtilsController{

  public Op = db.Op;
  
  private params;

  constructor(){}

  _setParams(params) {
    if('model' in params) this.params = params.model; // Example! params not really used
  }

  _count(req, res, model, options = {}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    return model
      .count(options)
      .then(result => {
        response.data = result;
        res.status(200).json(response);
      })
      .catch(error => res.status(400).send(error));
  }

  _findAndCountAll(req, res, model, options = {}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    return model
      .findAndCountAll(options)
      .then(result => {
        response.data = result;
        res.status(200).json(response);
      })
      .catch(error => res.status(400).send(error));
  }

  _findAll(req, res, model, options = {}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    return model
      .findAll(options)
      .then(result => {
        response.data = result;
        res.status(200).json(response);
      })
      .catch(error => res.status(400).send(error));
  }

  _findById(req, res, model, options = {}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    return model
      .findById(options["id"], options["options"])
      .then((result) => {
        if (!result) {
          res.status(403).json(response);
        }
        response.data = result;
        res.status(200).json(response);
      })
      .catch((error) => res.status(400).send(error));
  }

  _findOne(req, res, model, options = {}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    return model
      .findOne(options)
      .then((result) => {
        if (!result) {
          res.status(403).json(response);
        }
        response.data = result;
        res.status(200).json(response);
      })
      .catch(error => res.status(400).send(error));
  }

  _create(req, res, model, options = {}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    return model
      .create(options)
      .then(result => {
        response.data = result;
        res.status(200).json(response);
      })
      .catch(error => res.status(400).send(error));
  }

  _update(req, res, model, options = {fields: [], conditions: {}}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    let fieldValues = {};
    for (let field of options.fields) {
      if(field == 'userId'){
        fieldValues[field] = req['userObj'].id;
      }
      else{
        fieldValues[field] = req.body[field];
      }
    }
    model
    .update(
      fieldValues,
      {where: options['conditions'],
      returning: true,
      plain: true}
    )
    .then(result => {
      response.data = result[1];
      res.status(200).json(response);
    })
    .catch(error => res.status(400).send(error));
  }

  _destroy(req, res, model, options = {}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    return model
      .destroy(options)
      .then(result => {
        response.data = result;
        res.status(200).json(response);
      })
      .catch(error => res.status(400).send(error));
  }

  _truncate(req, res, model, options = {}) {
    let response = {data: {}};
    if(req.tokenObj) response['tokenObj'] = req.tokenObj;
    return model
      .destroy(options)
      .then(result => {
        response.data = result;
        res.status(200).json(response);
      })
      .catch(error => res.status(400).send(error));
  }

}