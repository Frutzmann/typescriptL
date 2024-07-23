import { ProjectImpl, Status } from "../models/project";

export class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

// Listener type
export type Listener<T> = (items: T[]) => void;
//Project State Management Singleton
export class ProjectState extends State<ProjectImpl> {
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
    console.log("Project: ", project);
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
export const projectState = ProjectState.getInstance();
