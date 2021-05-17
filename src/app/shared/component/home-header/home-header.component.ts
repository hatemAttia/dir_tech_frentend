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
  roleUser;

  constructor( private router:Router ,private vps: ViewportScroller,private authServ:AuthService) { 
    this.roleUser= this.authServ.getRole();
    if(this.roleUser==="ROLE_STUFF"){
      console.log("++"+this.roleUser);

    }
  }
  ngOnInit(): void {
  
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
