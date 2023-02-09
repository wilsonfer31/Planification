import { Component , OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-title-event',
  templateUrl: './add-title-event.component.html',
  styleUrls: ['./add-title-event.component.css']
})
export class AddTitleEventComponent implements OnInit{

  title : String = "";

  constructor( public dialogRef: MatDialogRef<AddTitleEventComponent>,){

  }
  ngOnInit(): void {
    this.dialogRef.updateSize('30%', '33%');
    
  }

  cancel() {
    this.dialogRef.close(false);
  }

 
  submit(){
    this.dialogRef.close(this.title);

  }
}
