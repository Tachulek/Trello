export interface Task {
   tableId: string,
   listId: string;
   taskName: string;
   _id?: number;
   comments: string[];
   orders: string[];
}