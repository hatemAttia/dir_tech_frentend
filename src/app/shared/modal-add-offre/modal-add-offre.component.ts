import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalAddOffreService } from '../modal-add-offre.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modal-add-offre',
  templateUrl: './modal-add-offre.component.html',
  styleUrls: ['./modal-add-offre.component.css']
})
export class ModalAddOffreComponent implements OnInit {
  @Input() id: string;
  private element: any;
  offerForm: FormGroup;

  constructor(private userServ:UserService,private formBuilder: FormBuilder,private el: ElementRef, private modalServ: ModalAddOffreService) {
    this.element = el.nativeElement;
    this.offerForm = this.formBuilder.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      poste: ['', Validators.required],     
      description: ['', Validators.required],     
    });
  }

  ngOnInit(): void {
    this.close();

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalServ.add(this);
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }

  addOffer(){
    this.userServ.addOffre(this.offerForm.value).subscribe(resp=>{
      console.log(resp)
    })

  }
}
