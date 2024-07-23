//Project status enum
export enum Status {
  Active,
  Finished,
}
//Project Squeleton Interface
export interface Project {
  title: string;
  description: string;
  people: number;
  status: Status;
}

//Project type that implements Project Interface
export class ProjectImpl implements Project {
  protected id: string;
  constructor(
    id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: Status
  ) {
    this.id = id;
  }

  get Id() {
    return this.id;
  }
}
