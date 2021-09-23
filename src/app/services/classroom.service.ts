import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { Classroom } from '../models/Classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private apiUrl = 'http://localhost:8080'; 

  //shares classroom objects between unrelated components 
  private classroom : BehaviorSubject<Classroom> = new BehaviorSubject<Classroom>( new Classroom());
  public sharedClassrom = this.classroom.asObservable();

  private headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer ' + localStorage.getItem('token')
  })
  constructor(private httpClient: HttpClient) { }
  
  
  getClassrooms() : Observable<Classroom[]> {
    return this.httpClient.get<Classroom []>(`${this.apiUrl}` + '/api/classrooms', {headers: this.headers})
  }

  addClassroom(classroom: Classroom): Observable<Classroom> {
    return this.httpClient.post<Classroom>(`${this.apiUrl}` + '/api/classrooms', classroom, {headers: this.headers} )
  }
  getClassroomByName(classroomName: string | undefined) : Observable<Classroom> {
    return this.httpClient.get<Classroom>(`${this.apiUrl}/api/classrooms/byName`, {
      params: {name : `${classroomName}`},
      headers: this.headers
    });
  }
  nextClassroom(classroom: Classroom){
    this.classroom.next(classroom);
  }

}
