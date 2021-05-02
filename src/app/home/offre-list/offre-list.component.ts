import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-offre-list',
  templateUrl: './offre-list.component.html',
  styleUrls: ['./offre-list.component.css']
})
export class OffreListComponent implements OnInit {
  
  listOffres;
  constructor(private userServ:UserService,private router:Router) { }

  ngOnInit(): void {

    this.userServ.getAlloffre().subscribe((resp: any) => {
      this.listOffres = resp;
    });
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  showDetail(data){
    this.userServ.setBlogOffre(data);
    this.router.navigate(['home/single-offre']);
  }

}
