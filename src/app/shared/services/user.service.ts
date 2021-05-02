import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  favoritesList = [];
  blogOffre = {
    "id": 2,
    "title": "offre d'emploi",
    "description": "Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molesti",
    "deadline": "2012-04-23T18:25:43.000Z",
    "avatar": "uploads/user.png",
    "poste": "45555",
    "createdAt": "2021-04-11T10:39:15.000Z",
    "updatedAt": "2021-04-11T10:39:15.000Z",
    "PersonelId": 1,
    "Personel": {
      "id": 1,
      "firstname": "bassma",
      "lastname": "cc",
      "email": "basma@gmail.com",
      "cin": 4552266,
      "password": "XBCyiTFezXo+pwTsZ58hO8dUDKrSxlz9m7dLnuyNaFZEVVtDVn4oe3QEAjiGOaD4",
      "phonenumber": 12111112,
      "matricule": "sdq222",
      "avatar": "uploads/user.png",
      "poste": "Teacher",
      "createdAt": "2021-04-11T10:38:30.000Z",
      "updatedAt": "2021-04-11T21:03:16.000Z"
    }
  };
  userData = {
    "id": 1,
    "firstname": "bassma",
    "lastname": "cc",
    "email": "basma@gmail.com",
    "cin": 4552266,
    "password": "XBCyiTFezXo+pwTsZ58hO8dUDKrSxlz9m7dLnuyNaFZEVVtDVn4oe3QEAjiGOaD4",
    "phonenumber": 12111112,
    "matricule": "sdq222",
    "avatar": "uploads/user.png",
    "poste": "Teacher",
    "createdAt": "2021-04-11T10:38:30.000Z",
    "updatedAt": "2021-04-11T21:03:16.000Z",
    "offres": [
      {
        "id": 9,
        "title": "sssssss",
        "description": "ssssssssssssssssssss",
        "deadline": "2021-04-14T00:00:00.000Z",
        "avatar": "uploads/user.png",
        "poste": "ssssss",
        "createdAt": "2021-04-22T20:59:44.000Z",
        "updatedAt": "2021-04-22T20:59:44.000Z",
        "PersonelId": 1
      },
      {
        "id": 8,
        "title": "offre d'emploi",
        "description": "Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molesti",
        "deadline": "2012-04-23T18:25:43.000Z",
        "avatar": "uploads/user.png",
        "poste": "teacher",
        "createdAt": "2021-04-22T20:51:38.000Z",
        "updatedAt": "2021-04-22T20:51:38.000Z",
        "PersonelId": 1
      },
      {
        "id": 7,
        "title": "offre d'emploi",
        "description": "Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molesti",
        "deadline": "2012-04-23T18:25:43.000Z",
        "avatar": "uploads/user.png",
        "poste": "teacher",
        "createdAt": "2021-04-11T10:40:13.000Z",
        "updatedAt": "2021-04-11T10:40:13.000Z",
        "PersonelId": 1
      },
      {
        "id": 6,
        "title": "offre d'emploi",
        "description": "Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molesti",
        "deadline": "2012-04-23T18:25:43.000Z",
        "avatar": "uploads/user.png",
        "poste": "teacher",
        "createdAt": "2021-04-11T10:40:12.000Z",
        "updatedAt": "2021-04-11T10:40:12.000Z",
        "PersonelId": 1
      },
      {
        "id": 5,
        "title": "offre d'emploi",
        "description": "Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molesti",
        "deadline": "2012-04-23T18:25:43.000Z",
        "avatar": "uploads/user.png",
        "poste": "teacher",
        "createdAt": "2021-04-11T10:40:12.000Z",
        "updatedAt": "2021-04-11T10:40:12.000Z",
        "PersonelId": 1
      },
      {
        "id": 4,
        "title": "offre d'emploi",
        "description": "Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molesti",
        "deadline": "2012-04-23T18:25:43.000Z",
        "avatar": "uploads/user.png",
        "poste": "teacher",
        "createdAt": "2021-04-11T10:40:12.000Z",
        "updatedAt": "2021-04-11T10:40:12.000Z",
        "PersonelId": 1
      },
      {
        "id": 3,
        "title": "offre d'emploi",
        "description": "Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molesti",
        "deadline": "2012-04-23T18:25:43.000Z",
        "avatar": "uploads/user.png",
        "poste": "teacher",
        "createdAt": "2021-04-11T10:40:08.000Z",
        "updatedAt": "2021-04-11T10:40:08.000Z",
        "PersonelId": 1
      },
      {
        "id": 2,
        "title": "offre d'emploi",
        "description": "Ad impedit qui officiis est in non aliquid veniam laborum. Id ipsum qui aut. Sit aliquam et quia molestias laboriosam. Tempora nam odit omnis eum corrupti qui aliquid excepturi molesti",
        "deadline": "2012-04-23T18:25:43.000Z",
        "avatar": "uploads/user.png",
        "poste": "45555",
        "createdAt": "2021-04-11T10:39:15.000Z",
        "updatedAt": "2021-04-11T10:39:15.000Z",
        "PersonelId": 1
      }
    ]
  };
  path = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }


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

  /**
  * Get all offre
  * @param element 
  */
  getAlloffre() {
    return this.http.get(this.path + "/offre/all").pipe(retry(2),
      catchError(this.traitementErreur));
  }

  getUserData() {
    return this.userData;
  }

  setAdminData(data) {
    this.userData = data;
  }

  /**
   * Update Image
   * @param element 
   */
  UpdateImageStuff(data) {

    const formData = new FormData();
    formData.append('file', data)
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/stuff/file", formData)
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
   * get Offres User
   * @returns 
   */
  getOffresUser() {
    return this.userData.offres;
  }

  /**
  * Add Offre
  * @param data 
  */
  addOffre(data) {
    console.log(data);
    const options = this.createRequestOptions();
    return this.http.post(this.path + "/offre/new/" + this.userData.id, JSON.stringify(data), { headers: options }).
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
   * get All Teachers
   * @returns 
   */
  getAllStuff() {
    return this.http.get(this.path + "/stuff/all").pipe(retry(2),
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
    this.favoritesList = this.getFavorites();
    const found = this.favoritesList.find(element => element.id == data.id);
    if (!found) {
      this.favoritesList.push(data);
      localStorage.setItem('favorites', JSON.stringify(this.favoritesList));
      return message = "teacher add in list favorie ,check list"
    }
    return message = "already favorite"
  }

  /**
  * 
  * @param data dlete favorite
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



  setBlogOffre(data) {
    this.blogOffre = data;
  }

  getBlogOffre() {
    return this.blogOffre;
  }
}

