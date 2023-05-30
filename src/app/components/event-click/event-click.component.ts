import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EventService } from 'src/app/_services/eventService/event-service';
import { eventAndTaskResponseDto } from 'src/app/_models/event/eventAndTaskResponseDto';
import { TasksDto } from 'src/app/_models/task/taskDto';
import { faEye } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-event-click',
  templateUrl: './event-click.component.html',
  styleUrls: ['./event-click.component.css']
})
export class EventClickComponent implements OnInit {
  eventValue: eventAndTaskResponseDto;
  taskWatchable: boolean = false;
  titleModify: boolean = false;
  faEye = faEye;

  constructor(
    public dialogRef: MatDialogRef<EventClickComponent>,
    public eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.eventService.getEventById(this.data.dataKey).subscribe(
      {
        next: (event: any) => { this.eventValue = event, this.getImage(event.start) },

      },

    )

  }

  cancel() {
    this.dialogRef.close(false);
  }


  submit() {
    this.eventService.saveEvent(this.eventValue).subscribe();
    this.dialogRef.close(this.eventValue.title);

  }
  taskWatchableFonction() {
    this.taskWatchable = !this.taskWatchable;
  }

  addTask() {
    this.taskWatchable = true;
    this.eventValue.tasks.push(new TasksDto);
  }

  removeTask(tasks: TasksDto) {
    this.eventValue.tasks = this.eventValue.tasks.filter(arrayItem => arrayItem !== tasks);

  }

  modifyTask(tasks: TasksDto) {

    tasks.show = !tasks.show;
  }

  modifyEventName() {
    this.titleModify = !this.titleModify;
  }

  deleteEvent(id: number) {
    this.eventService.delete(id).subscribe();
    window.location.reload();
  }



  getImage(date: string) {

    let year = date.substring(0, 4);

    let month = date.substring(5, 7);

    let day = date.substring(8, 10);


    const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return "../../../assets/weeksDay/" + weekday[new Date(`${month}/${day}/${year}`).getDay()] + ".jpg";
  }
}
