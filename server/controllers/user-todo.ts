import UtilsController from './utils';

import * as db from '../models';

export default class UserTodoController extends UtilsController{
  
  public model = db.Todo;

  constructor(){
    super();
    super._setParams({'model':this.model});
  }

  count = (req, res) => {
    return super._count(req, res, this.model, {});
  }

  findAndCountAll = (req, res) => {
    return super._findAndCountAll(req, res, this.model, {
      order: [
        ['id', 'ASC']
      ],
    });
  }
  
  findAll = (req, res) => {
    return super._findAll(req, res, this.model, {
      order: [
        ['id', 'ASC']
      ],
    });
  }

  findById = (req, res) => {
    return super._findById(req, res, this.model, {
      id: req.params.id,
      options: {}
    });
  }

  findOne = (req, res) => {
    return super._findOne(req, res, this.model, {
      //where: {fieldName: 'myNeedle'}
    });
  }

  create = (req, res) => {
    return super._create(req, res, this.model, {
      userId: req['userObj'].id,
      active: req.body.active,
      title: req.body.title,
      deadline: req.body.deadline,
      done: req.body.done,
    });
  }

  update = (req, res) => {
    let fields = [
      "active",
      "title",
      "deadline",
      "done"
    ];
    return super._update(req, res, this.model, {
      fields: fields,
      conditions: {
        $and: {
          id: req.params.id,
        }
      }
    });
  }

  destroy = (req, res) => {
    return super._destroy(req, res, this.model, {
      where: {id: req.params.id}
    });
  }

}