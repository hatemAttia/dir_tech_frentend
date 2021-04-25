import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-offre-list',
  templateUrl: './offre-list.component.html',
  styleUrls: ['./offre-list.component.css']
})
export class OffreListComponent implements OnInit {
  
  listOffres;
  constructor(private userServ:UserService) { }

  ngOnInit(): void {

    this.userServ.getAlloffre().subscribe((resp: any) => {
      this.listOffres = resp;
    });
    
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
