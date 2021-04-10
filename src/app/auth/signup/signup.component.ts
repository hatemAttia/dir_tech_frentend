import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userType;
  types;
  dropdownList = [];
  dropdownListtest;
  selectedItems = [];
  valid;
  dropdownSettings: IDropdownSettings = {};
  options = [];
  signupForm: FormGroup;
  constructor(
    public userServ: UserService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]{0,10})*@[A-Za-z0-9]+(\\.[A-Za-z0-9]{0,10})*(\\.[A-Za-z]{0,5})$'),
        Validators.required])],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      matricule: ['', Validators.required],
      phonenumber: ['', [Validators.required,Validators.min(10000000),Validators.maxLength(99999999)]],
      cin: ['',[Validators.required,Validators.min(10000000),Validators.maxLength(99999999)]],
      level: [''],
      description: [''],
      skill: [''],
      poste: [''],
    });
  }

  ngOnInit() {
    this.userType = "Stuff";
    this.userServ.getAllSkills().subscribe((resp: any) => {
      this.dropdownList = resp;
    });
    this.selectedItems = [];
    this.dropdownSettings;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.options = [
      "choose ...",
      "Maitre chercheur",
      "Maitre Assistant",
      "Doctorant",
      "Ingénieur",
      "Professeur"
    ];
    this.types = [
      "Stuff",
      "Teacher"
    ];
  }

  /**
   * 
   * @param item 
   */
  onItemSelectType(item: any) {
    this.userType = item;
    console.log(item);
  }

  /**
   * 
   * @param item 
   */
  onItemSelect(item: any) {
    console.log(item);
  }

  /**
   * 
   */
  onSelectAll(items: any) {
    console.log(items);
  }

  /**
   * 
   */
  signup() {
    console.log(this.signupForm.get('phonenumber').valid);
      


    if (this.userType == "Teacher") {
      if (!this.signupForm.valid ||
        this.signupForm.get('level').value == "" ||
        this.signupForm.get('skill').value == "" ||
        this.signupForm.get('description').value == "") {
        this.valid = true;
      } else {
        this.valid = false;
        //add teacher
        this.userServ.addEnseignant(this.signupForm.value).subscribe(resp => {
          console.log(resp);
        })
      }
    }else{
      if (!this.signupForm.valid ||this.signupForm.get('poste').value == ""){
        this.valid = true;
      }else{
        this.valid = false;
        //add stuff
        this.userServ.addPersonel(this.signupForm.value).subscribe(resp => {
          console.log(resp);
        })
      }
    }

    console.log(this.signupForm.valid);
    console.log(this.signupForm.value);
  }

    /**
   * Navigation
   * @param path: string; ;
   */
     navigateTo(path: string) {
      this.router.navigate([path]);
    }
}
