
export class TasksDto{
    id : number;
    task : string;
    eventsId : number;
    show : boolean = false;
    created : string;
    eventName: string;
    isValidated : boolean;
    constructor(){
        this.task = "New Task";
        this.show = true;
    }
}