import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userUploaded=false;
  options;
  userData;
  image;
  imageFile;
  imageImageUploaded = false;
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
    });
  }

  ngOnInit() { }

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
    this.userServ.UpdateImageTeacher(this.imageFile,this.userData.id).subscribe(resp => {
      this.imageImageUploaded = true;
    })
  }

  /**
   * update user
   */
  updateUser() {
    if (this.userConnected=="ROLE_TEACHER") {
      this.userServ.updateUserTeacher(this.profilForm.value, this.userData.id).subscribe(resp => {
        this.userUploaded=true;
        setTimeout(() => {
          this.userUploaded=false;
      }, 3000);
      })
    }else if(this.userConnected=="ROLE_STUFF"){
      this.userServ.updateUserStuff(this.profilForm.value, this.userData.id).subscribe(resp => {
        this.userUploaded=true;
        setTimeout(() => {
          this.userUploaded=false;
      }, 3000);
      })
    }
  }
}
