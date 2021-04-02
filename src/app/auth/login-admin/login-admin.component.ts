import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  valid=false;
  loginForm: FormGroup;
  constructor(private router: Router,
    public adminServ: AdminService,
    private formBuilder: FormBuilder,) { 
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.compose([
          Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]{0,10})*@[A-Za-z0-9]+(\\.[A-Za-z0-9]{0,10})*(\\.[A-Za-z]{0,5})$'),
          Validators.required])],
          password: ['', Validators.required]
      });
    }

  ngOnInit() {
   // this.login();
  }

  /**
   * Navigation
   * @param path: string; ;
   */
   navigateTo(path: string) {
    this.router.navigate([path]);
  }

  login() {
    this.adminServ.LoginAdmin(this.loginForm.value).subscribe(res=>{      
        this.valid=true;
      this.navigateTo("admin/home");
    },
    error => {
          this.valid=true;
    });
   
  }
}
