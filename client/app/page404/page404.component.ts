import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'page404',
  templateUrl: './page404.component.html'
})
export class Page404Component {

  constructor(
    private auth: AuthService,    
  ) { }

}
