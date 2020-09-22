import {Component, OnInit, CompilerOptions} from '@angular/core'

import {Task} from './task'
import {TasksService} from './tasks.service'
import {Router, ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import { ComponentLoaderComponent } from '../componentLoader.component'
import { ComponentLoaderService } from '../componentLoader.service'

@Component
({
   selector: 'app-tasks',
   templateUrl: './tasks.component.html',
   providers: [TasksService]
})

export class TasksComponent implements OnInit
{
   tasks: Task[]
   editTask: Task
   listId: string
   tableId: string
   comments: string[] = []
   orders: string[] = []
   visibleComments: string[] = []
   visibleOrders: string[] = []

   constructor(private taskService: TasksService, private http: HttpClient, private router: ActivatedRoute, private route: Router, private componentLoaderService: ComponentLoaderService)
   {
      router.params.subscribe(val => {
      this.ngOnInit()
      });
   }

   setListId(id: string)
   {
      this.listId = id;
   }

   toggleComments(name: string)
   {
      if(this.visibleComments.includes(name))
      {  
         this.visibleComments = this.visibleComments.filter(taskName => taskName !== name);
      }
      else
      {
         this.visibleComments.push(name)
      }
   }

   toggleOrders(name: string)
   {
      if(this.visibleOrders.includes(name))
      {  
         this.visibleOrders = this.visibleOrders.filter(taskName => taskName !== name);
      }
      else
      {
         this.visibleOrders.push(name)
      }
   }

   deleteComment(task: Task, comment: string)
   {
      this.editTask = task;
      this.comments = this.comments.filter(com => com !== comment);
      this.editTask.comments = this.comments
      this.update();
   }

   deleteOrder(task: Task, order: string)
   {
      this.editTask = task;
      this.orders = this.orders.filter(ord => ord !== order);
      this.editTask.orders = this.orders
      this.update();
   }

   addComment(comment: string, task: Task)
   {
      console.log(comment)
      this.editTask = task;
      this.editTask.comments.push(comment);
      this.comments.push(comment);
      this.update();
   }

   addOrder(order: string, task: Task)
   {
      console.log(order)
      this.editTask = task;
      this.editTask.orders.push(order);
      this.orders.push(order);
      this.update();
   }

   ngOnInit(){
      // this.router.paramMap.subscribe(params => {
      //    this.tableId = params.get("id")
      // })
      this.getTasks(this.listId)
   }

   getTasks(listId: string): void{
      this.taskService.getTasks(listId).subscribe(tasks => (this.tasks = tasks))
   }

   add(taskName: string): void {
      console.log('add')
      this.editTask = undefined
      console.log('editTask')
      taskName = taskName.trim()
      if(!taskName)
      {
         return
      }

      var listId: string = this.listId
      listId = listId.trim()
      if(!listId)
      {
         return
      }

      var tableId: string = this.tableId
      tableId = tableId.trim()
      if(!tableId)
      {
         return
      }

      var newTask: Task = {tableId, listId, taskName} as Task
      newTask.tableId = tableId
      newTask.listId = listId
      newTask.taskName = taskName
      this.taskService.addTask(newTask).subscribe(() => this.getTasks(this.listId))
   }

   delete(task: Task): void {
      console.log(task)
      this.taskService.deleteTask(task).subscribe(() => {
            this.getTasks(this.listId)
         })
      if(!task)
      {
         this.tasks = this.tasks.filter(h => h !== task)
      }
   }

   edit(task){
      this.editTask = task
   }

   update() {
      console.log("this edit task:")
      console.log(this.editTask);
      if(this.editTask) {
         this.taskService.updateTask(this.editTask).subscribe(() => {
            this.getTasks(this.listId)
         })
         this.editTask = undefined
      }
   }

   return()
   {
      console.log('tableId = ' + this.tableId)
      this.componentLoaderService.loadLists(this.tableId)
   }

}