import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs'

import {Table} from './table'

@Injectable()
export class TablesService {
   constructor(private http: HttpClient) {}

   getTables(userId: string): Observable<Table[]> {
      return this.http.get<Table[]>(`http://localhost:3000/api/${userId}/tables`)
   }

   addTable(table: Table): Observable<Table> {
      console.log("addtable" + table.tableName)
      return this.http.post<Table>(`http://localhost:3000/api/${table.userId}/table`, table)
   }

   deleteTable(table: Table): Observable<{}> {
      const url = `http://localhost:3000/api/table/${table._id}`
      return this.http.delete(url)
   }

   updateTable(table: Table): Observable<Table> {
      const url = `http://localhost:3000/api/Table/${table._id}`
      return this.http.put<Table>(url, table)
   }
}
