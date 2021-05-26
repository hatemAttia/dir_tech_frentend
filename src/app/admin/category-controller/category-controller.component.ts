import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/admin.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-category-controller',
  templateUrl: './category-controller.component.html',
  styleUrls: ['./category-controller.component.css']
})
export class CategoryControllerComponent implements OnInit {
  listCategories;
  searchToggle = false;
  updateToggle=false;
  categorieName;
  notifBody;
  notifToggle;
  page = 1;
  constructor(private modalService: NgbModal, public adminServ: AdminService, private userServ: UserService) { }

  ngOnInit(): void {
    this.display();
  }

  display() {
    this.userServ.getAllStcategory().subscribe((res: any) => {
      this.listCategories = res;
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  updateCatToggle(content,element){
    this.categorieName=element.name
    this.modalService.open(content, { size: 'lg' });
    
  }
  addCategory() {
    this.adminServ.addCategory({
      "name": this.categorieName
    }).subscribe(res => {
      console.log(res)
      this.display();
      this.notifBody = "Categorie " + this.categorieName + " added"
      this.categorieName = '';
      this.modalService.dismissAll();
      this.showNotif();
    })
  }

  deleteCategory(element) {
    this.adminServ.DeleteCategory(element.id).subscribe((resp: any) => {
      this.display();
      this.notifBody = resp.res
      this.showNotif();
    });
  }

  /**
   * 
   */
  showNotif() {
    this.notifToggle = true;
  }

  closeNotif() {
    this.notifToggle = false;
  }

}
