import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventServiceService } from 'src/app/_services/eventService/event-service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{

  initial_events$ = this.eventService.getAll();
  calendarVisible = true;
  
  constructor(private changeDetector: ChangeDetectorRef, private eventService : EventServiceService) {}
  
  async ngOnInit() {
    this.initial_events$.subscribe(events => {
      this.calendarOptions.initialEvents = events;
      this.changeDetector.detectChanges();
    });
}

  calendarOptions: CalendarOptions = {

    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };



  currentEvents: EventApi[] = [];

 

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); 
    
    console.log(selectInfo.startStr);

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });



      this.eventService.saveEvent({ 
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr ,
        allDay: selectInfo.allDay}).subscribe();
    }


  
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event);
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
   
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

 
    
}


