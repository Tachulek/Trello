import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs'

import {List} from './list'

@Injectable({ providedIn: 'root' })
export class ListsService {
   constructor(private http: HttpClient) {}

   getLists(tableId: string): Observable<List[]> {
      return this.http.get<List[]>(`http://localhost:3000/api/table/${tableId}`)
   }

   addList(list: List): Observable<List> {
      console.log(list)
      return this.http.post<List>('http://localhost:3000/api/list', list)
   }

   deleteList(list: List): Observable<{}> {
      const url = `http://localhost:3000/api/list/${list._id}`
      return this.http.delete(url)
   }

   updateList(list: List): Observable<List> {
      const url = `http://localhost:3000/api/list/${list._id}`
      return this.http.put<List>(url, list)
   }
}
