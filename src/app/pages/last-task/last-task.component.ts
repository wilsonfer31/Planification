import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-last-task',
  templateUrl: './last-task.component.html',
  styleUrls: ['./last-task.component.css']
})
export class LastTaskComponent {
  parentSubject:Subject<string> = new Subject();

  constructor() {
    
  }

 cardAnimation(value :any) {
    this.parentSubject.next(value);
  }

}
