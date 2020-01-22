import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { EventService } from '../_services/event.service';
import { Event } from '../_models/event.model';


// type Day = {
//   currentMonth: boolean,
//   day: number
// }

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  chevronLeft = faChevronLeft;
  chevronRight = faChevronRight;

  daysPreviousMonth: Date[];
  daysCurrentMonth: Date[];
  daysNextMonth: Date[];

  days: Date[];
  rows: number[] = [];

  previousMonth: number;
  currentMonth: number;
  nextMonth: number;
  currentYear: number;
  today: Date;

  events: Event[];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.today = new Date();

    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();

    this.loadDays();

    this.events = this.eventService.getEvents();
  }

  checkForEvents(day) {
    // console.log(day);
  }

  reverseMonth() {
    if(this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.loadDays();
  }

  forwardMonth() {
    if(this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.loadDays();
  }

  private getEventsForCurrentMonth() {
    this.events = this.eventService.getEvents().filter(event => {
      return new Date(event.date).getMonth() === this.currentMonth;
    });
  }

  private loadDays() {
    this.rows = [];

    this.daysPreviousMonth = this.calendarDaysPreviousMonth();

    this.daysCurrentMonth = this.calendarDaysCurrentMonth();

    this.daysNextMonth = this.calendarDaysNextMonth();

    this.days = this.daysPreviousMonth.concat(this.daysCurrentMonth).concat(this.daysNextMonth);

    let numRows = this.days.length / 7;

    for(let i=0; i <= numRows; i++) {
      this.rows.push(i)
    }
  }

  private daysInMonth(year: number, month: number): number {
    return new Date(year, month+1, 0).getDate();
  }

  private getFirstWeekday(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  private getLastWeekday(year: number, month: number): number {
    return new Date(year, month+1, 0).getDay();
  }

  private calendarDaysPreviousMonth(): Date[] {
    let days: Date[] = [];

    let startDay: number = this.numDaysPreviousMonth() - this.getFirstWeekday(this.currentYear, this.currentMonth) + 1;

    let endDay: number = this.numDaysPreviousMonth();

    let startDate: Date = new Date(this.currentYear-1, 11, startDay);

    console.log(startDate);

    for(let i=startDay; i <= endDay; i++) {
      days.push(new Date());
    }

    return days;

  }

  private calendarDaysCurrentMonth(): Date[] {
    let days: Date[] = [];

    let startDay: number = 1;
    let endDay: number = this.numDaysCurrentMonth();

    for(let i=startDay; i <= endDay; i++) {
      days.push({
        currentMonth: true,
        day: i
      });
    }

    return days;

  }

  private calendarDaysNextMonth(): Date[] {
    let days: Date[] = [];

    let startDay: number = 1;
    let endDay: number = startDay + (6 - this.getLastWeekday(this.currentYear, this.currentMonth));

    for(let i=startDay; i < endDay; i++) {
      days.push({
        currentMonth: false,
        day: i
      });
    }

    return days;

  }

  private numDaysCurrentMonth(): number {
    return this.daysInMonth(this.currentYear, this.currentMonth);
  }

  private numDaysPreviousMonth(): number {
    if(this.currentMonth === 1){
      return this.daysInMonth(this.currentYear-1, 12);
    } else {
      return this.daysInMonth(this.currentYear, this.currentMonth-1);
    }
  }
}
