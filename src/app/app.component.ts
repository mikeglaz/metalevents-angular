import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'metalevents';

  constructor(private dataService: DataService){}

  ngOnInit() {
    console.log("AppComponent#OnInit");
    this.dataService.fetchEvents().subscribe();
  }
}
