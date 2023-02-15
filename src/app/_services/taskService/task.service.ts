import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/app/_environement/environment';
import { TasksDto } from 'src/app/_models/task/taskDto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })

  }

  url = environment.base_api_back + '/tasks';


  constructor(private http: HttpClient) { }


  getAllNotValidatedTask(): Observable<TasksDto []> {
    return this.http.get<TasksDto []>(`${this.url}/notValidated`).pipe(catchError(error => {throw error;}));
  }

  updateTask(event : TasksDto) : Observable<TasksDto>{
    return this.http.post<TasksDto>(this.url,event, this.httpHeaders).pipe(catchError(error => {throw error}));
}


validateTask(id : number) : Observable<TasksDto>{
  return this.http.post<TasksDto>(`${this.url}/validate/${id}`, this.httpHeaders).pipe(catchError(error => {throw error}));
}
}
