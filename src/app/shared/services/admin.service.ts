import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  adminID = 1;
  adminData = {
    "id": 2,
    "firstname": "hatem12",
    "lastname": "hatem",
    "email": "hatem1@gmail.com",
    "cin": 45555,
    "phonenumber": 12111112,
    "avatar": "uploads/1617749395924user.png"
  };
  path = " http://localhost:3000/api";

  // path = "https://back-end-pfa.herokuapp.com/api";
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
   * Login admin
   * @param element 
   */
  LoginAdmin(data) {
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/auth/admin", JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  /**
   * update User
   * @param element 
   * @param id 
   */
   updateUser(data, id: number) {
    const options = this.createRequestOptions();
    return this.http.put(this.path + "/admin/update/" + id, JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }
  
  deleteTeacher(id){
    return this.http.delete(this.path + "/teacher/delete/"+ parseInt(id)).pipe(retry(2),
      catchError(this.traitementErreur));
  }

  deleteStuff(id){
    return this.http.delete(this.path + "/stuff/delete/"+ parseInt(id)).pipe(retry(2),
      catchError(this.traitementErreur));
  }

  /**
   * Update Image
   * @param element 
   */
  UpdateImage(data) {

    const formData = new FormData();
    formData.append('file', data)
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/admin/file", formData)
  }


  /**
   * 
   * @returns Get All teacher
   */
  getAllTeacher() {
    return this.http.get(this.path + "/teacher/all").pipe(retry(2),
      catchError(this.traitementErreur));
  }

  /**
   *  Add skill
   * @param data 
   * @returns 
   */
  addSkill(data,idcategory){
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/skill/new/"+idcategory, JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }
  
  /**
   * Updta skill
   * @param data 
   * @param id 
   * @returns 
   */
  updateSkill(data,id){
    const options = this.createRequestOptions();
    return this.http.put(this.path + "/skill/update/" + id, JSON.stringify(data), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  
  }

  /**
   * 
   * @param id Delete skill
   * @returns 
   */
  DeleteSkill(id){
    console.log(id);
    const options = this.createRequestOptions();
    return this.http.delete(this.path + "/skill/delete/" + parseInt(id), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

   /**
   *  Add category
   * @param data 
   * @returns 
   */
    addCategory(data){
      const options = this.createRequestOptions();
      return this.http.post(this.path + "/category/new", JSON.stringify(data), { headers: options }).
        pipe(retry(2),
          catchError(this.traitementErreur))
    }

    /**
   * 
   * @param id Delete skill
   * @returns 
   */
  DeleteCategory(id){
    console.log(id);
    const options = this.createRequestOptions();
    return this.http.delete(this.path + "/category/delete/" + parseInt(id), { headers: options }).
      pipe(retry(2),
        catchError(this.traitementErreur))
  }

  getAdminID() {
    return this.adminID;
  }

  setAdminId(id) {
    this.adminID = id;
  }

  getAdminData() {
    return this.adminData;
  }

  setAdminData(data) {
    this.adminData = data;
  }
}

