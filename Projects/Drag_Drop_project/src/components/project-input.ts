import { projectState } from "../state/project-state";
import { Component } from "./base-component";
import { ProjectImpl, Status} from "../models/project";
import { Validatable, validate } from "../util/validation";
import { Autobind } from "../decorators/autobind";

// OOP RENDERING
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
