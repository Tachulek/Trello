import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {Observable} from 'rxjs'

import {Task} from './task'

@Injectable()
export class TasksService {
   constructor(private http: HttpClient) {}

   getTasks(): Observable<Task[]> {
      return this.http.get<Task[]>('http://localhost:3000/api/tasks')
   }

   addTask(task: Task): Observable<Task> {
      console.log(task)
      return this.http.post<Task>('http://localhost:3000/api/task', task)
   }

   deleteTask(task: Task): Observable<{}> {
      const url = `http://localhost:3000/api/task/${task._id}`
      return this.http.delete(url)
   }

   updateTask(task: Task): Observable<Task> {
      const url = `http://localhost:3000/api/task/${task._id}`
      return this.http.put<Task>(url, task)
   }
}
