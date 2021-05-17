import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userUploaded = false;
  dropdownSettings: IDropdownSettings = {};

  options;
  userData;
  image;
  imageFile;
  imageImageUploaded = false;
  dropdownList = [];
  userConnected;
  profilForm: FormGroup;
  constructor(private userServ: UserService, private authServ: AuthService, private formBuilder: FormBuilder) {
    this.options = [
      "choose ...",
      "Maitre chercheur",
      "Maitre Assistant",
      "Doctorant",
      "Ingénieur",
      "Professeur"
    ];
    this.userConnected = this.authServ.getRole();
    this.userData = this.userServ.getUserData();
    console.log(this.userData);
    this.image = "http://localhost:3000/" + this.userData.avatar;
    this.profilForm = this.formBuilder.group({
      firstname: [this.userData.firstname, Validators.required],
      lastname: [this.userData.lastname, Validators.required],
      matricule: [this.userData.matricule, Validators.required],
      phonenumber: [this.userData.phonenumber, [Validators.required, Validators.min(10000000), Validators.maxLength(99999999)]],
      cin: [this.userData.cin, [Validators.required, Validators.min(10000000), Validators.maxLength(99999999)]],
      level: [this.userData.level],
      description: [this.userData.description],
      poste: [this.userData.poste],
      skill: [''],
    });
    console.log(this.userData.skills)
  }

  ngOnInit() {
    this.userServ.getAllSkills().subscribe((resp: any) => {
      this.dropdownList = resp;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onFileChanged(event) {
    this.imageFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.image = reader.result;
      //  console.log(this.image);
    }
  }

  /**
   * upload image
   */
  onUpload() {
    if (this.userConnected == "ROLE_TEACHER") {
      this.userServ.UpdateImageTeacher(this.imageFile, this.userData.id).subscribe(resp => {
        this.showNotif();
      })
    }else if (this.userConnected == "ROLE_STUFF"){
      this.userServ.UpdateImageStuff(this.imageFile, this.userData.id).subscribe(resp => {
        this.showNotif();
      })
    }
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
   * update user
   */
  updateUser() {
    if (this.userConnected == "ROLE_TEACHER") {
      this.userServ.updateUserTeacher(this.profilForm.value, this.userData.id).subscribe(resp => {
        this.userUploaded = true;
        setTimeout(() => {
          this.userUploaded = false;
        }, 3000);
      })
    } else if (this.userConnected == "ROLE_STUFF") {
      this.userServ.updateUserStuff(this.profilForm.value, this.userData.id).subscribe(resp => {
        this.userUploaded = true;
        setTimeout(() => {
          this.userUploaded = false;
        }, 3000);
      })
    }
  }

  showNotif() {
    this.imageImageUploaded = true;
  }

  closeNotif() {
    this.imageImageUploaded = false;
  }

  removeskills(skillId) {
    this.userServ.removeSkillInTeacher({
      "EnseignantId": this.userData.id,
      "skillId": skillId
    }).subscribe(res => {
      console.log(res)
      this.userServ.getUserDataFromDB().subscribe((res: any) => {
        console.log(res)
        this.userData = res;
        this.userServ.setUserData(res);
      });
    })
  }

  /**
   * 
   */
  addSkills() {
    if (this.profilForm.get('skill').value !== '') {
      this.userServ.addSkillToTeacher({
        "skill": this.profilForm.get('skill').value
      }).subscribe(res => {
        console.log(res)
        this.userServ.getUserDataFromDB().subscribe((res: any) => {
          console.log(res)
          this.userData = res;
          this.userServ.setUserData(res);
        });
      })
    }
  }
}
