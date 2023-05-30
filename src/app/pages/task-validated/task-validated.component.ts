import { Component, OnInit } from '@angular/core';
import { TasksDto } from 'src/app/_models/task/taskDto';
import { TaskService } from 'src/app/_services/taskService/task.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-validated',
  templateUrl: './task-validated.component.html',
  styleUrls: ['./task-validated.component.css']
})
export class TaskValidatedComponent implements OnInit{
  faTrash = faTrash;
  tasks: TasksDto[];

  constructor(private taskService : TaskService){

  }


  ngOnInit() {
  this.getTasks();
  }


  getTasks(){
    this.taskService.getAllValidatedTask().subscribe({
      next: (tasks : TasksDto[])=> this.tasks = tasks
    });
  }

  removeTask(id :number){
    this.taskService.removeTask(id).subscribe({
      next : () => this.getTasks()
    });
  }



}
