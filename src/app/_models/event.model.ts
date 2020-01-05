export class Event {
  constructor(
    public name: string,
    public description: string,
    public date: Date,
    public venue: string,
    public id?: number) {}
}
