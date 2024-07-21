"use strict";
const names = [];
const promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("This is done");
    }, 2000);
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Francis" }, { age: 30 });
function countAndPrint(element) {
    let descriptionText = "Got no value";
    if (element.length > 0)
        descriptionText = "Got 1 element.";
    if (element.length > 1)
        descriptionText = `Got ${element.length} elements.`;
    return [element, descriptionText];
}
console.log(countAndPrint([1, 2, 3, 4]));
function extractAndConvert(obj, key) {
    return obj[key];
}
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Max");
textStorage.addItem("Francis");
textStorage.addItem("Ismail");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const firstnames = ['Francis', 'Nana'];
//# sourceMappingURL=app.js.map