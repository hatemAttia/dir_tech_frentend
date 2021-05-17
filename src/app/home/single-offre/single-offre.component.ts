import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-single-offre',
  templateUrl: './single-offre.component.html',
  styleUrls: ['./single-offre.component.css']
})
export class SingleOffreComponent implements OnInit {
  image;
  offreData;
  constructor(private userServ: UserService) {
    this.offreData = this.userServ.getBlogOffre();
   
    setTimeout(() => {
      this.image = "http://localhost:3000/" + this.offreData.Personel.avatar;
    }, 1000);
    

   }
 
  ngOnInit(): void {
   
    }

}
