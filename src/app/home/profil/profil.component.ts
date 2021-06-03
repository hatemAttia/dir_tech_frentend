import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userUploaded = false;
  dropdownSettings: IDropdownSettings = {};
  currentPassword:any;
  confPassword:any;
  newPassword:any;
  options:any;
  userData:any;
  image:any;
  imageFile:any;
  imageImageUploaded = false;
  dropdownList = [];
  userConnected:any;
  _imgButtonEnabel = true;
  _profilButtonEnabel = true;
  profilForm: FormGroup;
  diplomaList = [];
  establishments = [];
  optionsstuff = [];

  constructor(private modalService: NgbModal, private userServ: UserService, private authServ: AuthService, private formBuilder: FormBuilder) {

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
      diplomainstituation: [this.userData.diplomainstituation],
      yearsexperience: [this.userData.yearsexperience],
      url: [this.userData.url],
      certificat: [this.userData.certificat],
      degreeobtained: [this.userData.degreeobtained],
      skill: [''],
    });
  }

  ngOnInit() {
    this.display();

    this.diplomaList = [
      "licence Technologie de l’informatique",
      "Diplôme d'ingénieur en génie logiciel ",
      "Master en ingénierie des systèmes d'information",
      "Master en sécurité informatique",
      "licence d'informatique",
    ]

    this.establishments = [
      "L'École pluridisciplinaire internationale(EPI)",
      "Ecole Nationale d’Ingénieurs de Tunis (ENIT)",
      "Ecole Nationale d’Ingénieurs de Sousse (ENISO)",
      "Ecole Nationale d’Ingénieurs de Bizerte (ENIB) ",
      "Ecole Nationale d’Ingénieurs de Monastir (ENIM)",
      "Ecole Nationale d’Ingénieurs de Sfax (ENIS)",
      "Faculté des Sciences de Tunis (FST)",
      "Ecole Nationale Supérieure d’Ingénieurs de Tunis (ENSIT)",
      "Ecole Nationale d’Ingénieurs de Carthage (ENI-Carthage)",
      "Ecole Nationale d’Electronique et de Communication de Sfax (ENET’Com) ",
      "Ecole Nationale des Sciences de l’Informatique (ENSI)",
      "Ecole Supérieure des Communications de Tunis (SUP’COM)",
      "Ecole Polytechnique de Tunisie (EPT)",
    ];

    this.optionsstuff = [
      "scolatité",
      "equipe administrative"
    ];

    this.options = [
      "Maitre chercheur",
      "Maitre Assistant",
      "Doctorant",
      "Ingénieur",
      "Professeur"
    ];
  }

  display() {
    this.userServ.getAllSkills().subscribe((res: any) => {
      var dd = [];
      if (this.userData.skills)
        res.forEach(skill => {
          var found = this.userData.skills.filter(elment => skill.id == elment.id)
          if (found.length <= 0) {
            dd.push(skill)
          }

        });
      this.dropdownList = dd;
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
      this._imgButtonEnabel = false;
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
    } else if (this.userConnected == "ROLE_STUFF") {
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
        this.userData = this.userServ.getUserData();
        setTimeout(() => {
          this.userUploaded = false;
        }, 3000);
      })
    } else if (this.userConnected == "ROLE_STUFF") {
      this.userServ.updateUserStuff(this.profilForm.value, this.userData.id).subscribe(resp => {
        this.userData = this.userServ.getUserData();
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
      this.userServ.getTeacherDataFromDB().subscribe((res: any) => {
        this.userData = res;
        this.userServ.setUserData(res);
        this.display();

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
        this.profilForm.controls['skill'].setValue("");
        setTimeout(() => {
          this.userServ.getTeacherDataFromDB().subscribe((res: any) => {
            console.log(res);

            this.userData = res;
            this.userServ.setUserData(res);

            this.display();
          });
        }, 200);
      })
    }
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
