import {Component, OnInit} from '@angular/core'

import {Router} from '@angular/router'
import {Table} from './table'
import {TablesService} from './tables.service'

import {HttpClient} from '@angular/common/http'
import { AuthenticationService } from '../authentication.service'

@Component
({
   selector: 'app-tables',
   templateUrl: './tables.component.html',
   providers: [TablesService]
})

export class TablesComponent implements OnInit
{
   tables: Table[]
   editTable: Table

   constructor(private tableService: TablesService, private router: Router, private auth: AuthenticationService){}

   ngOnInit(){
      const current = this.auth.getUserDetails()
      if(current)
      {
        this.getTables(current.id)
      }
   }

   getTables(userId: number): void{
      this.tableService.getTables(userId.toString()).subscribe(tables => (this.tables = tables))
   }

   add(tableName: string): void {
      console.log('add '+ tableName)
      this.editTable = undefined
      console.log('editTable')
      tableName = tableName.trim()
            console.log('add2 '+ tableName)
      if(!tableName)
      {
         return
      }

      const current = this.auth.getUserDetails()
      const userId = current.id
      const newTable: Table = {userId, tableName} as Table
      console.log("user id: " + newTable.userId)
      console.log("tableName: " + newTable.tableName)
      this.tableService.addTable(newTable).subscribe(() => this.getTables(this.auth.getUserDetails().id))
   }

   delete(table: Table): void {
      console.log(table)
      this.tableService.deleteTable(table).subscribe(() => console.log('Table deleted'))
      if(!table)
      {
          this.tables = this.tables.filter(h => h !== table)
      }
   }

   edit(table){
      this.editTable = table
   }

   update() {
      console.log("this edit table:")
      console.log(this.editTable);
      if(this.editTable) {
         this.tableService.updateTable(this.editTable).subscribe(() => {
            this.getTables(this.auth.getUserDetails().id)
         })
         this.editTable = undefined
      }
   }

   open(id: String)
   {
      this.router.navigateByUrl(`/table/${id}`)
   }

}