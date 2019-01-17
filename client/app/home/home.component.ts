import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

import { ToastComponent } from '../shared/toast/toast.component';
import { PublicHomeService } from '../services/public-home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  datas = [];
  isLoading = true;
  isEditing = false;
  
  constructor(
    private authService: AuthService,
    private publicHomeService: PublicHomeService,
    public toast: ToastComponent,
  ) { }

  ngOnInit() {
    this.initHome();
  }
  
  initHome() {
    this.publicHomeService.initHome().subscribe(
      async res => {
        let e = true;
        if(res.tokenObj) {
          e = await this.authService.handleToken(res.tokenObj);
        }
        if(e){
          this.datas = res.data;
        }
      },
      error => {
        if(JSON.parse(error._body).tokenObj) this.authService.handleToken(JSON.parse(error._body).tokenObj);
      },
      () => this.isLoading = false
    );
  }

}
