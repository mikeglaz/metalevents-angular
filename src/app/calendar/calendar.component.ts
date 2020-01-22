import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

type Day = {
  currentMonth: boolean,
  day: number
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  chevronLeft = faChevronLeft;
  chevronRight = faChevronRight;

  daysPreviousMonth: Day[];
  daysCurrentMonth: Day[];
  daysNextMonth: Day[];

  days: Day[];
  rows: number[] = [];

  currentMonth: number;
  currentYear: number;
  today: Date;

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

  constructor() {}

  ngOnInit() {
    this.today = new Date();

    this.currentMonth = this.today.getMonth();
    this.currentYear = this.today.getFullYear();



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

  private calendarDaysPreviousMonth(): Day[] {
    let days: Day[] = [];

    let startDay: number = this.numDaysPreviousMonth() - this.getFirstWeekday(this.currentYear, this.currentMonth) + 1;

    let endDay: number = this.numDaysPreviousMonth();

    for(let i=startDay; i <= endDay; i++) {
      days.push({
        currentMonth: false,
        day: i
      });
    }

    return days;

  }

  private calendarDaysCurrentMonth(): Day[] {
    let days: Day[] = [];

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

  private calendarDaysNextMonth(): Day[] {
    let days: Day[] = [];

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

  // private getPreviousMonthDays(year: number, month: number): number[] {
  //   if(month === 1) {
  //     year--;
  //   }

  //   const dayOfWeek = this.getFirstWeekday(year, month);
  //   let days: number[] = [];

  //   for(let i=0; i < dayOfWeek; i++) {
  //     days.push(i);
  //   }

  //   return days;
  // }

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
