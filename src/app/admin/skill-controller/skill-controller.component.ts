import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/admin.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-skill-controller',
  templateUrl: './skill-controller.component.html',
  styleUrls: ['./skill-controller.component.css']
})
export class SkillControllerComponent implements OnInit {

  skillName;
  listSkill;
  _category;
  listCategories;
  addToggle = false;
  notifToggle = false;
  searchName = '';
  tSearch = false;
  idSkill;
  notifBody;
  page = 1;
  collectionSize;
  constructor(private modalService: NgbModal,public adminServ: AdminService, private userServ: UserService,
    private router: Router) { }

  ngOnInit() {
    this.display();
  }
  
  /**
   * 
   */
  display() {
    this.userServ.getAllSkills().subscribe((res: any) => {
      this.listSkill = res;
      if(this.listSkill)
      this.collectionSize=this.listSkill.length
    });
    this.userServ.getAllStcategory().subscribe((res: any) => {
      this.listCategories = res;
     
    });
    
  }

  /**
   * 
   */
  toggleSearch() {
    this.tSearch = !this.tSearch;
  }

  /**
   * 
   */
  addSkill() {
    const found =this.listCategories.find(cat=> cat.name ==this._category)
      this.adminServ.addSkill({
        "name": this.skillName
      },found.id).subscribe(res => {
        console.log(res)
        this.display();
        this.notifBody = "Skill " + this.skillName + " added"
        this.skillName = '';
        this.showNotif();
      })
  }

  /**
   * 
   */
  updateSkill() {
    const found =this.listCategories.find(cat=> cat.name ==this._category)
    if (this.skillName != '') {
      this.adminServ.updateSkill({
        "name": this.skillName,
        "categoryId":found.id
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
  DeleteSkill(element) {
    this.adminServ.DeleteSkill(element.id).subscribe((resp: any) => {
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
    this._category=element.category.name;
    this.addToggle = !this.addToggle;
    this.skillName = element.name;
    this.idSkill = element.id;
    if (!this.addToggle) {
      this.skillName = "";
      this.idSkill = "";
    }
  }

  closeUpdateBlock() {
    this.skillName = '';
    this.idSkill = "";
    this.addToggle = false;
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
