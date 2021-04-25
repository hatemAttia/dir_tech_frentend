import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAddOffreService } from 'src/app/shared/modal-add-offre.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  offerForm: FormGroup;
  listOffres;
  constructor(private userServ :UserService,private formBuilder: FormBuilder, private modalServ: ModalAddOffreService) {
    this.offerForm = this.formBuilder.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      matricule: ['', Validators.required],
      poste: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.listOffres=this.userServ.getOffresUser();
    console.log( this.listOffres[0].poste);
   }


  openModal(id: string) {
    this.modalServ.open(id);
  }

  closeModal(id: string) {
    this.modalServ.close(id);
  }

}
