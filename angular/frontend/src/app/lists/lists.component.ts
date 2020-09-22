import {Component, OnInit, CompilerOptions} from '@angular/core'

import {List} from './list'
import {ListsService} from './lists.service'
import {Router, ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import { ComponentLoaderComponent } from '../componentLoader.component'
import { ComponentLoaderService } from '../componentLoader.service'

@Component
({
   selector: 'app-lists',
   templateUrl: './lists.component.html',
   providers: [ListsService]
})

export class ListsComponent implements OnInit
{
   lists: List[]
   editList: List
   tableId: string

   constructor(private listService: ListsService, private http: HttpClient, private router: ActivatedRoute, private route: Router, private componentLoaderService: ComponentLoaderService)
   {
      router.params.subscribe(val => {
      this.ngOnInit()
      });
   }

   setTableId(id: string)
   {
      this.tableId = id;
   }

   ngOnInit(){
      // this.router.paramMap.subscribe(params => {
      //    this.tableId = params.get("id")
      // })
      this.getLists(this.tableId)
   }

   getLists(tableId: string): void{
      this.listService.getLists(tableId).subscribe(lists => (this.lists = lists))
   }

   add(listName: string): void {
      console.log('add')
      this.editList = undefined
      console.log('editTask')
      listName = listName.trim()
      if(!listName)
      {
         return
      }

      var tableId: string = this.tableId
      tableId = tableId.trim()
      if(!tableId)
      {
         return
      }

      var newList: List = {tableId, listName} as List
      newList.tableId = tableId
      newList.listName = listName
      this.listService.addList(newList).subscribe(() => this.getLists(this.tableId))
   }

   delete(list: List): void {
      console.log(list)
      this.listService.deleteList(list).subscribe(() => {
            this.getLists(this.tableId)
         })
      if(!list)
      {
         this.lists = this.lists.filter(h => h !== list)
      }
   }

   edit(list){
      this.editList = list
   }

   update() {
      console.log("this edit list:")
      console.log(this.editList);
      if(this.editList) {
         this.listService.updateList(this.editList).subscribe(() => {
            this.getLists(this.tableId)
         })
         this.editList = undefined
      }
   }

   open(id: string)
   {
      this.componentLoaderService.loadTasks(id, this.tableId)
   }

   return()
   {
      this.componentLoaderService.loadComponent("Table")
   }

}