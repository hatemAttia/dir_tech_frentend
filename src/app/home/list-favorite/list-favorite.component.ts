import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list-favorite',
  templateUrl: './list-favorite.component.html',
  styleUrls: ['./list-favorite.component.css']
})
export class ListFavoriteComponent implements OnInit {
  teachers;
  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    this.teachers = this.userServ.getFavorites();
    console.log(this.userServ.getFavorites());
  }

  deleteFavorie(id) {
    this.userServ.DeleteFavorite(id);
    this.teachers = this.userServ.getFavorites();
  }

}
