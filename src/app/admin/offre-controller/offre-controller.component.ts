import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-offre-controller',
  templateUrl: './offre-controller.component.html',
  styleUrls: ['./offre-controller.component.css']
})
export class OffreControllerComponent implements OnInit {

  listOffre;
  searchName='';
  tSearch=false;
  page=1;
  constructor( public adminServ: AdminService,private userServ: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userServ.getAlloffre().subscribe((resp: any) => {
      console.log(resp);
      this.listOffre=resp;
    },error =>{ 
      console.log(error);
    });
  }

  toggleSearch(){
    this.tSearch=!this.tSearch;
  }
  
}
