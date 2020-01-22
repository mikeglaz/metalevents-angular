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
    return this.events.filter(event => {
      let eventDate = new Date(event.date);

      return (eventDate.getMonth() === day.getMonth()) && (eventDate.getDate() === day.getDate())
    });
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

  getPreviousMonth() {
    if(this.currentMonth === 0) {
      return 11;
    } else {
      return this.currentMonth - 1;
    }
  }

  getNextMonth() {
    if(this.currentMonth == 11) {
      return 0;
    } else {
      return this.currentMonth + 1;
    }
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
    let year: number;
    let month: number;

    let startDay: number = this.numDaysPreviousMonth() - this.getFirstWeekday(this.currentYear, this.currentMonth) + 1;

    let endDay: number = this.numDaysPreviousMonth();

    if(this.currentMonth === 0) {
      year = this.currentYear - 1;
      month = 11;
    } else {
      year = this.currentYear;
      month = this.currentMonth - 1;
    }

    for(let i=startDay; i <= endDay; i++) {
      days.push(new Date(year, month, i));
    }

    return days;

  }

  private calendarDaysCurrentMonth(): Date[] {
    let days: Date[] = [];

    let startDay: number = 1;
    let endDay: number = this.numDaysCurrentMonth();

    for(let i=startDay; i <= endDay; i++) {
      days.push(new Date(this.currentYear, this.currentMonth, i));
    }

    return days;

  }

  private calendarDaysNextMonth(): Date[] {
    let days: Date[] = [];
    let year: number;
    let month: number;

    let startDay: number = 1;
    let endDay: number = startDay + (6 - this.getLastWeekday(this.currentYear, this.currentMonth));

    if(this.currentMonth === 11) {
      year = this.currentYear + 1;
      month = 0;
    } else {
      year = this.currentYear;
      month = this.currentMonth + 1;
    }

    for(let i=startDay; i < endDay; i++) {
      days.push(new Date(year, month, i));
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
