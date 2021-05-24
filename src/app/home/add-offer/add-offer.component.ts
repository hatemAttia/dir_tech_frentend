import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  offerForm: FormGroup;
  listOffres;
  closeResult = '';
  _offreId =0;
  constructor(
    private modalService: NgbModal,
    private userServ: UserService,
    private formBuilder: FormBuilder,) {
    this.offerForm = this.formBuilder.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      poste: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
   this.display();
  }

  display() {
    this.userServ. getOffresUser().subscribe(res=>{
      this.listOffres =res
    });
    
  }


  offreFormOpen(content,id) {
    this._offreId =id;
        this.offerForm.setValue({
      title: "",
      deadline: "",
      poste: "",
      description: "",
    });
    this.modalService.open(content, { size: 'lg' });
  }

  UpdateFormOpen(content, offre) {
    this._offreId =offre.id;
    this.offerForm.setValue({
      title: offre.title,
      deadline: offre.deadline,
      poste: offre.poste,
      description: offre.description,
    });
    this.modalService.open(content, { size: 'lg' });
  }

  addOffer() {
    if ( this._offreId == 0) {
      console.log(this.userServ.getUserData());
      this.userServ.addOffre(this.offerForm.value).subscribe((res: any) => {
        this.display();
        this.modalService.dismissAll()
      })
    }else { 
      console.log("hiii");
      this.userServ.updateOffre(this.offerForm.value,this._offreId).subscribe((res: any) => {
        console.log(res);
        this.display();
      })
    }
  }

  deleteOffre(id){
    this.userServ.DeleteOffre(id).subscribe((res:any)=>{
      console.log(res)
      this.display();
    })
  }
}
