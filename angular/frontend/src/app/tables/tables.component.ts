import {Component, OnInit} from '@angular/core'

import {Router} from '@angular/router'
import {Table} from './table'
import {TablesService} from './tables.service'

import {HttpClient} from '@angular/common/http'
import { AuthenticationService } from '../authentication.service'
import { ComponentLoaderService } from '../componentLoader.service'

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

   constructor(private tableService: TablesService, private router: Router, private auth: AuthenticationService, private componentLoaderService: ComponentLoaderService){}

   ngOnInit(){
      const current = this.auth.getUserDetails()
      if(current)
      {
        this.getTables(current.id.toString())
      }
   }

   getTables(userId: string): void{
      this.tableService.getTables(userId).subscribe(tables => (this.tables = tables))
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
      const userId = current.id.toString()
      const _id = Number("2134");
      const newTable: Table = {_id, userId, tableName} as Table
      console.log("user id: " + newTable.userId)
      console.log("tableName: " + newTable.tableName)
      this.tableService.addTable(newTable).subscribe(() => this.getTables(this.auth.getUserDetails().id.toString()))
   }

   delete(table: Table): void {
      console.log(table)
      this.tableService.deleteTable(table).subscribe(() => this.getTables(this.auth.getUserDetails().id.toString()))
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
            this.getTables(this.auth.getUserDetails().id.toString())
         })
         this.editTable = undefined
      }
   }

   open(id: string)
   {
      this.componentLoaderService.loadLists(id)
   }

}