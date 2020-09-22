
import { Injectable,ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ComponentLoaderService {
  constructor(private cfr: ComponentFactoryResolver) {}

   vcr: ViewContainerRef

   setViewContainerRef(ref: ViewContainerRef)
   {
      this.vcr = ref;
   }


   async loadTasks(listId: string, tableId: string)
   {
      const { TasksComponent } = await import ('./tasks/tasks.component')
      this.vcr.clear();
      let compFactory = this.cfr.resolveComponentFactory(TasksComponent);

      let ref = this.vcr.createComponent(compFactory);
      ref.instance.listId = listId;
      ref.instance.tableId = tableId;

      return ref   
   }

   async loadLists(tableId: string)
   {
      const { ListsComponent } = await import ('./lists/lists.component')
      this.vcr.clear();
      let compFactory = this.cfr.resolveComponentFactory(ListsComponent);

      let ref = this.vcr.createComponent(compFactory);
      ref.instance.tableId = tableId;

      return ref  
      
   }


  async loadComponent(componentName: string) {

   const { TablesComponent } = await import('./tables/tables.component');
   const { EmptyComponent } = await import ('./empty/empty.component');


   let component : any;
   if(componentName === "Table")
   {
      component = TablesComponent
   }
   else
   {
      component = EmptyComponent
   }

   this.vcr.clear();

   return this.vcr.createComponent(
   this.cfr.resolveComponentFactory(component))    
}}