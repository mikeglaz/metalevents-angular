import { Component, OnInit } from "@angular/core";
import { Event } from "../event.model";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"]
})
export class EventListComponent implements OnInit {
  events: Event[] = [
    new Event(
      "Abigor",
      "Nachthymnen Tour",
      new Date(2019, 12, 29, 19, 0, 0),
      "Reggies Rock House"
    ),
    new Event(
      "Ghost",
      "A Pale Tour Named Death",
      new Date(2020, 1, 1, 19, 0, 0),
      "Double Door"
    ),
    new Event(
      "Metallica",
      "World Tour 2020",
      new Date(2020, 1, 31, 20, 0, 0),
      "Vic Theatre"
    ),
    new Event(
      "Arcturus",
      "Church Burning Tour 2020",
      new Date(2020, 2, 1, 20, 0, 0),
      "Cobra Lounge"
    ),
    new Event(
      "Opeth",
      "Blackwater Park Tour",
      new Date(2020, 2, 5, 21, 0, 0),
      "Oak Theatre"
    ),
    new Event(
      "Animals As Leaders",
      "Tempting Death Tour",
      new Date(2020, 3, 3, 19, 0, 0),
      "Aragon Ballroom"
    )
  ];

  constructor() {}

  ngOnInit() {}
}
