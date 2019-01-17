import UtilsController from './utils';

export default class PublicHomeController extends UtilsController{

  constructor(){
    super();
    //super._setParams({'model':this.model});
  }

  initHome(req, res){
    let response = {
      message: "you are welcome"
    };
    return res.status(200).json({data:response});
  }

}