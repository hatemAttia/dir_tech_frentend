import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  favoritesList = [];
  blogOffre;
  userData: any;
  path = "https://back-end-pfa.herokuapp.com/api";
  accountVerify;
  constructor(private http: HttpClient,private authServ:AuthService) { }


  /**
   * Option http
   */
  private createRequestOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return headers;
  }

  /**
   * traitement Erreur
   * @param erreur 
   */
  traitementErreur(erreur: HttpErrorResponse) {
    if (erreur.error instanceof ErrorEvent) {
      console.log('Une erreur s est produite', erreur.error.message);
    } else
      console.error("code renvoyé par le backen " + erreur.status +
        + "le corps était : " + JSON.stringify(erreur.error));
    return throwError("quelque chose est arrivé ; Veuillez reessayer plus tard");
  }

  /**
  * Get all skills
  */
  getAllSkills() {
    return this.http.get(this.path + "/skill/all").pipe(retry(2),
      catchError(this.traitementErreur));
  }

  /**
  * Add Teacher
  * @param data 
  */
  addEnseignant(data) {
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/teacher/new", JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
  * Add Stuff
  * @param data 
  */
  addPersonel(data) {
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/stuff/new", JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
   * Login stuff
   * @param data 
   */
  stuffLogin(data) {
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/auth/stuff", JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
   * Login teacher
   * @param element 
   */
  teacherLogin(data) {
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/auth/teacher", JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  verfierAccount(){
    this.getUserData()
console.log(this.userData);

    if(this.authServ.getRole()=="ROLE_TEACHER"){
        if(this.userData.degreeobtained) {
        return false;
      }else{
        return true;
      }
    }else{
      return false;
    }
  }

  /**
  * Get all offre
  * @param element 
  */
  getAlloffre() {
    return this.http.get(this.path + "/offre/all").pipe(retry(2),
      catchError(this.traitementErreur));
  }

  getUserData() {
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    return this.userData;
  }
   
  /**
   * get Offres User
   * @returns 
   */
     getOffresUser() {
       this.getUserData()
      return this.http.get(this.path + "/offre/useroffre/"+this.userData.id).pipe(retry(2),
      catchError(this.traitementErreur));
    }
  
  setUserData(data) {
    localStorage.setItem('userdata', JSON.stringify(data));
    this.userData = data;
  }

  /**
   * Update Image
   * @param element 
   */
  UpdateImageStuff(data, id) {

    const formData = new FormData();
    formData.append('file', data)
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/stuff/file/" + id, formData)
  }

  /**
   * Update Image
   * @param element 
   */
  UpdateImageTeacher(data, id) {

    const formData = new FormData();
    formData.append('file', data)
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/teacher/file/" + id, formData)
  }

  /**
   * update Teacher
   * @param element 
   * @param id 
   */
  updateUserTeacher(data, id: number) {
    const options = this.createRequestOptions();
    return this.http.put(this.path + "/teacher/update/" + id, JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
   * update Stuff
   * @param element 
   * @param id 
   */
  updateUserStuff(data, id: number) {
    const options = this.createRequestOptions();
    return this.http.put(this.path + "/stuff/update/" + id, JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
  * Add Offre
  * @param data 
  */
  addOffre(data) {
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/offre/new/" + this.userData.id, JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

   /**
  * Update Offre
  * @param data 
  */
    updateOffre(data,id) {
      const options = this.createRequestOptions();
      return this.http.put(this.path + "/offre/update/" + id, JSON.stringify(data), { headers: options }).
        pipe(retry(2),
          catchError(this.traitementErreur))
    }
    
    /**
     * Delete !offre
     * @param id 
     * @returns 
     */
    DeleteOffre(id){
      
      const options = this.createRequestOptions();
      return this.http.delete(this.path + "/offre/delete/" + parseInt(id), { headers: options }).
        pipe(retry(2),
          catchError(this.traitementErreur))
    }  
  /**
   * get All Teachers
   * @returns 
   */
  getAllTeachers() {
    return this.http.get(this.path + "/teacher/all").pipe(retry(2),
      catchError(this.traitementErreur));
  }


  /**
   * get All stuff
   * @returns 
   */
  getAllStuff() {
    return this.http.get(this.path + "/stuff/all").pipe(retry(2),
      catchError(this.traitementErreur));
  }

  /**
   * get All category
   * @returns 
   */
   getAllStcategory() {
    return this.http.get(this.path + "/category/all").pipe(retry(2),
      catchError(this.traitementErreur));
  }


  /**
   * find Teacher By Skills
   */
  findTeacherBySkills(element) {
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/teacher/search", JSON.stringify(element), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }
  
  /**
   * find Teacher By Skills
   */
   findTeacherByCategory(id) {
    const options = this.createRequestOptions();
    return this.http.get(this.path + "/teacher/search/"+id, { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
     * 
     * @param data get favorite
     * @returns 
     */
  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites'));

  }

  /**
   * 
   * @param data add favorite
   * @returns 
   */
  addFavorite(data: any) {
    var message;
     this.getFavorites();
    const found = this.favoritesList.find(element => element.id == data.id);
    if (!found) {
      this.favoritesList.push(data);
      localStorage.setItem('favorites', JSON.stringify(this.favoritesList));
      return message = "teacher add in list favorie ,check list"
    }else{
      return message = "already favorite"

    }
  }

  /**
  * 
  * @param data delete favorite
  * @returns 
  */
  DeleteFavorite(id) {
    this.favoritesList = this.getFavorites();
    this.favoritesList.forEach((element, index) => {
      if (element.id == id) {
        this.favoritesList.splice(index, 1);
      }
    });
    localStorage.setItem('favorites', JSON.stringify(this.favoritesList));
  }

  /**
   * add skill to teacher
   * @param element 
   * @returns 
   */
  addSkillToTeacher(element) {
    console.log(element);
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/teacher/addskill/" + this.userData.id, JSON.stringify(element), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
   * remove skill to teacher
   * @param ids 
   * @returns 
   */
  removeSkillInTeacher(ids) {
    console.log(ids);
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/teacher/deleteskill", JSON.stringify(ids), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
   * 
   */
  getTeacherDataFromDB() {
    return this.http.get(this.path + "/teacher/" + this.userData.id).pipe(retry(2),
      catchError(this.traitementErreur))
  }

  /**
   * 
   */
   getStuffDataFromDB() {
    return this.http.get(this.path + "/stuff/" + this.userData.id).pipe(retry(2),
      catchError(this.traitementErreur))
  }
  setBlogOffre(data) {
    this.blogOffre = data;
  }

  getBlogOffre() {
    return this.blogOffre;
  }
}

