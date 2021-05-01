import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-skill-controller',
  templateUrl: './skill-controller.component.html',
  styleUrls: ['./skill-controller.component.css']
})
export class SkillControllerComponent implements OnInit {
  skillName;
  listStuff;
  addToggle = false;
  notifToggle = false;
  searchName = '';
  tSearch = false;
  idSkill;
  notifBody;
  constructor(public adminServ: AdminService, private userServ: UserService,
    private router: Router) { }

  ngOnInit() {
    this.display();
  }

  display() {
    this.userServ.getAllSkills().subscribe((resp: any) => {
      console.log(resp);
      this.listStuff = resp;
    }, error => {
      console.log(error);
    });
  }

  toggleSearch() {
    this.tSearch = !this.tSearch;
  }

  /**
   * 
   */
  addSkill() {
    if (this.skillName != '') {
      this.adminServ.addSkill({
        "name": this.skillName
      }).subscribe(res => {
        console.log(res)
        this.display();
        this.notifBody = "Skill " + this.skillName + " added"
        this.skillName = '';
        this.showNotif();
      })
    }
  }

 
  /**
   * 
   */
  updateSkill() {
    if (this.skillName != '') {
      this.adminServ.updateSkill({
        "name": this.skillName
      }, this.idSkill).subscribe(res => {

        this.display();
        this.notifBody = "Skill " + this.skillName + " updated"
        this.skillName = '';
        this.idSkill = "";
        this.showNotif();
      })
    }
  }

  /**
   * 
   */
  DeleteSkill(element){
    this.adminServ.DeleteSkill(element.id).subscribe((resp:any) => {

      this.display();
      this.notifBody = resp.res
      this.showNotif();
    })
  }
  showNotif() {
    this.notifToggle = true;
  }

  closeNotif() {
    this.notifToggle = false;
  }

  toggleUpdate(element) {
    this.addToggle = !this.addToggle;
    this.skillName = element.name;
    this.idSkill = element.id;
    if (!this.addToggle) {
      this.skillName = "";
      this.idSkill = "";
    }
  }

  closeUpdateBlock(){
    this.skillName = '';
    this.idSkill = "";
    this.addToggle=false;
  }

}
