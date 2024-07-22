//AUTOBIND DECORATOR
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const ajdDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return ajdDescriptor;
}

//VALIDATOR DECORATOR
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required)
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  if (validatableInput.minLength && typeof validatableInput.value === "string")
    isValid =
      isValid &&
      validatableInput.value.toString().trim().length >=
        validatableInput.minLength;
  if (validatableInput.maxLength && typeof validatableInput.value === "string")
    isValid =
      isValid &&
      validatableInput.value.toString().trim().length <
        validatableInput.maxLength;
  if (validatableInput.min && typeof validatableInput.value === "number")
    isValid = isValid && validatableInput.value >= validatableInput.min;
  if (validatableInput.max && typeof validatableInput.value === "number")
    isValid = isValid && validatableInput.value < validatableInput.max;

  return isValid;
}
//Project status enum
enum Status {
  Active,
  Finished,
}
//Project Squeleton Interface
interface Project {
  title: string;
  description: string;
  people: number;
  status: Status;
}

//Drag & Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

//Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId;

    this.attach(insertAtStart);
  }
  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

//Project type that implements Project Interface
class ProjectImpl implements Project {
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

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

// Listener type
type Listener<T> = (items: T[]) => void;
//Project State Management Singleton
class ProjectState extends State<ProjectImpl> {
  private projects: ProjectImpl[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  addProject(project: ProjectImpl) {
    this.projects.push(project);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  moveProject(projectId: string, newStatus: Status) {
    const project = this.projects.find((prj) => prj.Id === projectId);
    console.log('Project: ', project);
    if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
    } 
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }

  static getInstance() {
    if (!this.instance) this.instance = new ProjectState();
    return this.instance;
  }
}
const projectState = ProjectState.getInstance();

//TO DO
class ProjectItem
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
// Project list CLASS
class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: ProjectImpl[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";

    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }

  @Autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @Autobind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(prjId, this.type === 'active' ? Status.Active : Status.Finished);
  }

  @Autobind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: ProjectImpl[]) => {
      const relevantProjects = projects.filter((prj) =>
        this.type === "active"
          ? prj.status === Status.Active
          : prj.status === Status.Finished
      );
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + "PROJECTS";
  }
}
// OOP RENDERING
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  private gatherUserInput(): ProjectImpl | void {
    console.log("GATHERING");
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descValidatable: Validatable = {
      value: enteredDescription,
      required: true,
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid Input, Please Try Again !");
      return;
    } else {
      return new ProjectImpl(
        Math.random().toString(),
        enteredTitle,
        enteredDescription,
        +enteredPeople,
        Status.Active
      );
    }
  }
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (userInput) {
      projectState.addProject(userInput);
      this.clearInputs();
    }
  }
}
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
