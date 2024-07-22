"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Autobind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var ajdDescriptor = {
        configurable: true,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return ajdDescriptor;
}
function validate(validatableInput) {
    var isValid = true;
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
var Status;
(function (Status) {
    Status[Status["Active"] = 0] = "Active";
    Status[Status["Finished"] = 1] = "Finished";
})(Status || (Status = {}));
var Component = (function () {
    function Component(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId)
            this.element.id = newElementId;
        this.attach(insertAtStart);
    }
    Component.prototype.attach = function (insertAtStart) {
        this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    };
    return Component;
}());
var ProjectImpl = (function () {
    function ProjectImpl(id, title, description, people, status) {
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = id;
    }
    Object.defineProperty(ProjectImpl.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    return ProjectImpl;
}());
var State = (function () {
    function State() {
        this.listeners = [];
    }
    State.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    return State;
}());
var ProjectState = (function (_super) {
    __extends(ProjectState, _super);
    function ProjectState() {
        var _this = _super.call(this) || this;
        _this.projects = [];
        return _this;
    }
    ProjectState.prototype.addProject = function (project) {
        this.projects.push(project);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    ProjectState.prototype.moveProject = function (projectId, newStatus) {
        var project = this.projects.find(function (prj) { return prj.Id === projectId; });
        console.log('Project: ', project);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    };
    ProjectState.prototype.updateListeners = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    ProjectState.getInstance = function () {
        if (!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    };
    return ProjectState;
}(State));
var projectState = ProjectState.getInstance();
var ProjectItem = (function (_super) {
    __extends(ProjectItem, _super);
    function ProjectItem(hostId, project) {
        var _this = _super.call(this, "single-project", hostId, false, project.Id) || this;
        _this._project = project;
        _this.configure();
        _this.renderContent();
        return _this;
    }
    Object.defineProperty(ProjectItem.prototype, "persons", {
        get: function () {
            return this._project.people === 1
                ? "1 person"
                : "".concat(this._project.people, " persons");
        },
        enumerable: false,
        configurable: true
    });
    ProjectItem.prototype.configure = function () {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    };
    ProjectItem.prototype.renderContent = function () {
        this.element.querySelector("h2").textContent = this._project.title;
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this._project.description;
    };
    ProjectItem.prototype.dragStartHandler = function (event) {
        event.dataTransfer.setData("text/plain", this._project.Id);
        event.dataTransfer.effectAllowed = "move";
    };
    ProjectItem.prototype.dragEndHandler = function (_) { };
    __decorate([
        Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        Autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    return ProjectItem;
}(Component));
var ProjectList = (function (_super) {
    __extends(ProjectList, _super);
    function ProjectList(type) {
        var _this = _super.call(this, "project-list", "app", false, "".concat(type, "-projects")) || this;
        _this.type = type;
        _this.assignedProjects = [];
        _this.configure();
        _this.renderContent();
        return _this;
    }
    ProjectList.prototype.renderProjects = function () {
        var listEl = document.getElementById("".concat(this.type, "-project-list"));
        listEl.innerHTML = "";
        for (var _i = 0, _a = this.assignedProjects; _i < _a.length; _i++) {
            var prjItem = _a[_i];
            new ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    };
    ProjectList.prototype.dragOverHandler = function (event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            var listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    };
    ProjectList.prototype.dropHandler = function (event) {
        var prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? Status.Active : Status.Finished);
    };
    ProjectList.prototype.dragLeaveHandler = function (_) {
        var listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    };
    ProjectList.prototype.configure = function () {
        var _this = this;
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        projectState.addListener(function (projects) {
            var relevantProjects = projects.filter(function (prj) {
                return _this.type === "active"
                    ? prj.status === Status.Active
                    : prj.status === Status.Finished;
            });
            _this.assignedProjects = relevantProjects;
            _this.renderProjects();
        });
    };
    ProjectList.prototype.renderContent = function () {
        var listId = "".concat(this.type, "-project-list");
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + "PROJECTS";
    };
    __decorate([
        Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    return ProjectList;
}(Component));
var ProjectInput = (function (_super) {
    __extends(ProjectInput, _super);
    function ProjectInput() {
        var _this = _super.call(this, "project-input", "app", true, "user-input") || this;
        _this.titleInputElement = _this.element.querySelector("#title");
        _this.descriptionInputElement = _this.element.querySelector("#description");
        _this.peopleInputElement = _this.element.querySelector("#people");
        _this.configure();
        return _this;
    }
    ProjectInput.prototype.gatherUserInput = function () {
        console.log("GATHERING");
        var enteredTitle = this.titleInputElement.value;
        var enteredDescription = this.descriptionInputElement.value;
        var enteredPeople = this.peopleInputElement.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        var descValidatable = {
            value: enteredDescription,
            required: true,
        };
        var peopleValidatable = {
            value: enteredPeople,
            required: true,
        };
        if (!validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid Input, Please Try Again !");
            return;
        }
        else {
            return new ProjectImpl(Math.random().toString(), enteredTitle, enteredDescription, +enteredPeople, Status.Active);
        }
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener("submit", this.submitHandler);
    };
    ProjectInput.prototype.renderContent = function () { };
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    };
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (userInput) {
            projectState.addProject(userInput);
            this.clearInputs();
        }
    };
    __decorate([
        Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}(Component));
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
//# sourceMappingURL=app.js.map