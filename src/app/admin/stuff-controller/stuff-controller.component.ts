import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-stuff-controller',
  templateUrl: './stuff-controller.component.html',
  styleUrls: ['./stuff-controller.component.css']
})
export class StuffControllerComponent implements OnInit {

  listStuff;
  searchName='';
  tSearch=false;
  constructor( public adminServ: AdminService,private userServ: UserService,
    private router: Router) { }

  ngOnInit() {
    this.display();
  }

  display(){
    this.userServ.getAllStuff().subscribe((resp: any) => {
      console.log(resp);
      this.listStuff=resp;
    },error =>{ 
      console.log(error);
    });
  }
  toggleSearch(){
    this.tSearch=!this.tSearch;
  }
  
  deleteStuff(id){
    this.adminServ.deleteStuff(id).subscribe((res:any)=>{
      console.log(res)
    })
    this.display();
  }
}
