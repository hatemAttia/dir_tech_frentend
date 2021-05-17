import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.css']
})
export class HomeTeacherComponent implements OnInit {
  notifToggle =false;
  listTeachers;
  ListallTeacher;
  searchName='';
  notifBody;
  skill = "tous";
  p:number;
  options = [{ id: 0, name: "tous", createdAt: "2021-04-27T11:35:00.000Z", updatedAt: "2021-04-13T11:35:00.000Z" }];
  constructor(private userServ: UserService) { }

  ngOnInit() {
    this.userServ.getAllSkills().subscribe((resp: any) => {
      resp.forEach(element => this.options.push(element));
    })

    this.userServ.getAllTeachers().subscribe(resp => {
      this.listTeachers = resp;
      this.ListallTeacher = resp;
      console.log(resp)
    });
  }

  searchTeacher() {
    if (this.skill != "tous") {
      //search by skill
      this.userServ.findTeacherBySkills({
        "skill": this.skill
      }).subscribe(resp => {
        this.listTeachers = resp;
          this.p=1;
      })
    } else {
      this.listTeachers = this.ListallTeacher;
      //search with both
    }
  }

  addFavorite(data){
   this.notifBody = this.userServ.addFavorite(data)
   console.log(this.notifBody);
   this.showNotif();
  }

  showNotif() {
    this.notifToggle = true;
  }

  closeNotif() {
    this.notifToggle = false;
  }
}
