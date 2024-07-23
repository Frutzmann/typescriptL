import { Draggable } from "../models/drag-drop";
import { Component } from "./base-component";
import { ProjectImpl } from "../models/project";
import { Autobind } from "../decorators/autobind";

//TO DO
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private _project: ProjectImpl;

  get persons() {
    return this._project.people === 1
      ? "1 person"
      : `${this._project.people} persons`;
  }
  constructor(hostId: string, project: ProjectImpl) {
    super("single-project", hostId, false, project.Id);
    this._project = project;
    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent() {
    this.element.querySelector("h2")!.textContent = this._project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this._project.description;
  }

  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this._project.Id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @Autobind
  dragEndHandler(_: DragEvent) {}
}
