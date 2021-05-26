import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.css']
})
export class HomeTeacherComponent implements OnInit {
  notifToggle = false;
  _category;
  listCategories;
  listTeachers;
  ListallTeacher;
  searchName = '';
  notifBody;
  skill = "tous";
  p: number;
  options = [];
  constructor(private userServ: UserService) { }

  ngOnInit() {
    this.userServ.getAllSkills().subscribe((resp: any) => {
      resp.forEach(element => this.options.push(element));
    })

    this.userServ.getAllTeachers().subscribe(res => {
      this.listTeachers = res;
      this.ListallTeacher = res;
      console.log(res)
    });

    this.userServ.getAllStcategory().subscribe((res: any) => {
      this.listCategories = res;
    });
  }



  searchTeacher() {
    if (this.skill != "tous") {
      //search by skill
      this.userServ.findTeacherBySkills({
        "skill": this.skill
      }).subscribe(resp => {
        this.listTeachers = resp;
        this.p = 1;
      })
    } else {
      this.listTeachers = this.ListallTeacher;
      //search with both
    }
  }

  searchTeacherByCategorie() {
    const _fakeOption = [];
    const found = this.listCategories.find(cat => cat.name === this._category)
    this.userServ.getAllSkills().subscribe((res: any) => {
    
      if (res)
        res.forEach(op => {
          if (found.name !== "tous") {
            if (op.categoryId == found.id)
            _fakeOption.push(op)
          } else {
              _fakeOption.push(op);
          }

        });
      this.options = _fakeOption;
    })
    this.userServ.findTeacherByCategory(found.id).subscribe(res => {
      this.listTeachers = res;
      this.p = 1;
    })
  }

  addFavorite(data) {
    this.notifBody = this.userServ.addFavorite(data)
    console.log(data);
    this.showNotif();
  }

  showNotif() {
    this.notifToggle = true;
  }

  closeNotif() {
    this.notifToggle = false;
  }



}
