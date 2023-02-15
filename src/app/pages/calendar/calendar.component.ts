import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EventService } from 'src/app/_services/eventService/event-service';
import { MatDialog } from '@angular/material/dialog';
import { EventClickComponent } from 'src/app/components/event-click/event-click.component';
import { Router } from '@angular/router';
import { AddTitleEventComponent } from 'src/app/components/add-title-event/add-title-event.component';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  initial_events$ = this.eventService.getAll();
  calendarVisible = true;

  constructor(private changeDetector: ChangeDetectorRef, private eventService: EventService, private dialog: MatDialog, private router: Router) { }

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

  async handleDateSelect(selectInfo: DateSelectArg) {
    let title = "";
    const calendarApi = selectInfo.view.calendar;

    const dialogRef = this.dialog.open(AddTitleEventComponent);
    dialogRef.afterClosed().subscribe(result => {
      title = result,

      calendarApi.unselect();


      if (title) {
        this.eventService.saveEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        }).subscribe((value: EventInput) => {
          calendarApi.addEvent({
            id: value.id,
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          });
        });




      }

    })
  }

  handleEventClick(clickInfo: EventClickArg) {


    const dialogRef = this.dialog.open(EventClickComponent, {
      data: {
        dataKey: clickInfo.event.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {result != false? clickInfo.event.setProp('title', result) : '' })



    clickInfo.jsEvent.preventDefault();


  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }



}


