import { TasksDto } from "../task/taskDto";

export interface eventAndTaskResponseDto{
     id : number;
    title : string;
    start : string;
    end : string;
    allDay : Boolean;
    url : string;
     tasks : TasksDto[];
   
}