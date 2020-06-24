import {Component, OnInit} from '@angular/core'

import {Task} from './task'
import {TasksService} from './tasks.service'

import {HttpClient} from '@angular/common/http'

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

   constructor(private taskService: TasksService, private http: HttpClient){}

   ngOnInit(){
      this.getTasks()
   }

   getTasks(): void{
      this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
   }

   add(task_name: string): void {
      console.log('add')
      this.editTask = undefined
      console.log('editTask')
      task_name = task_name.trim()
      if(!task_name)
      {
         return
      }

      const newTask: Task = {task_name} as Task
      this.taskService.addTask(newTask).subscribe(() => this.getTasks())
   }

   delete(task: Task): void {
      console.log(task)
      this.taskService.deleteTask(task).subscribe(() => console.log('Tag deleted'))
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
            this.getTasks()
         })
         this.editTask = undefined
      }
   }

}