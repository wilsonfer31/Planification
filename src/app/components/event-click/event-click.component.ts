import { Component , OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';



@Component({
  selector: 'app-event-click',
  templateUrl: './event-click.component.html',
  styleUrls: ['./event-click.component.css']
})
export class EventClickComponent implements OnInit{
  eventValue: any;

  constructor(
    public dialogRef: MatDialogRef<EventClickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  ngOnInit(): void {
  
    this.eventValue = this.data.dataKey.event;
    console.log(this.eventValue);  
  }

  cancel() {
    this.dialogRef.close(false);
  }

 
  submit(){
    this.dialogRef.close(this.eventValue);

  }
}
