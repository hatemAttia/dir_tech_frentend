import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor( private router:Router ,private authServ:AuthService) { }

  ngOnInit() {
  }
  
  logout(){
    this.authServ.logout();
    this.navigateTo("login");
  }

  /**
 * Navigation
 * @param path: string; ;
 */
   navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
