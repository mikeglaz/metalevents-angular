    export class Event {
      constructor(
        public name: string,
        public description: string,
        public date: Date,
        public user_id: number,
        public venue_id: number,
        public id: number) {}
    }
