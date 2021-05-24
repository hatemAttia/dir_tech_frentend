import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  roleUser:any;
  mobile=false;
  isMobileLayout:boolean;
  constructor( private router:Router ,private vps: ViewportScroller,private authServ:AuthService) { 
    this.roleUser= this.authServ.getRole();
    if(this.roleUser==="ROLE_STUFF"){
      console.log("++"+this.roleUser);

    }
  }
  ngOnInit(): void {
    if (document.body.offsetWidth <= 1000) { 
      this.isMobileLayout = true;
    }
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 1000;
    console.log(document.body.offsetWidth);
   
  
  }

  logout(){
    this.authServ.logout();
    this.navigateTo("login");
  }

  scrollToElement(id): void {
    console.log(id);
    this.vps.scrollToAnchor(id);
  }

  /**
 * Navigation
 * @param path: string; ;
 */
     navigateTo(path: string) {
      this.router.navigate([path]);
    }
}
