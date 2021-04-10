import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {


  adminData;
  image;
  imageFile;
  imageImageUploaded=false;

  profilForm:FormGroup;
  constructor(private adminServ: AdminService,private formBuilder: FormBuilder) {
    this.adminData = this.adminServ.getAdminData();
    this.image="http://localhost:3000/"+this.adminData.avatar;
    console.log(this.image);
    this.profilForm = this.formBuilder.group({
      firstname: [this.adminData.firstname, Validators.required],
      lastname: [this.adminData.lastname, Validators.required],
      phonenumber: [this.adminData.phonenumber,[ Validators.required,Validators.min(10000000),Validators.maxLength(99999999)]],
      cin: [this.adminData.cin, Validators.required],
      
    });
  }

  ngOnInit() {  }

  onFileChanged(event) {
    this.imageFile=event.target.files[0];
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.image = reader.result; 
    //  console.log(this.image);
		}
  }
  onUpload() {
    this.adminServ.UpdateImage(this.imageFile).subscribe(resp =>{
      console.log(resp);
      this.imageImageUploaded=true;
    })
  }

  updateUser(){
console.log(this.profilForm.value)
    this.adminServ.updateUser(this.profilForm.value,this.adminData.id).subscribe(resp =>{
      console.log(resp)
    })
  }
}
