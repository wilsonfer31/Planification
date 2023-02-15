import { animate, keyframes, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { TasksDto } from 'src/app/_models/task/taskDto';
import { TaskService} from 'src/app/_services/taskService/task.service';
import * as kf from './keyframes';



@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))
    ])
  ]
})
export class TaskCardComponent {
  public tasks: TasksDto[];
  public index = 0;
  @Input()
  parentSubject: Subject<any>;



  animationState: string;
  constructor(private TaskService : TaskService) { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      this.startAnimation(event)
    });

    
    this.getAllTasks();

   
  }

  getAllTasks(){
    this.TaskService.getAllNotValidatedTask().subscribe({
      next:  (tasks : TasksDto []) => {this.tasks = tasks }
    });
  }

  startAnimation(state: any) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(state: any, task : TasksDto) {
      if(state.fromState != "void" && !state.fromState){
        console.log(state.toState)
        console.log(task.task)

        this.animationState = '';
        this.index++;
        
        if(state.toState == "swiperight"){
          this.TaskService.validateTask(task.id).subscribe(()=> this.getAllTasks());
        }

        if(this.index == this.tasks.length){
          this.index = 0;
        }
      }
  }


  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }

}
