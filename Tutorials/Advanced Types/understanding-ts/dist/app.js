"use strict";
var _a;
const e1 = {
    name: "Francis",
    privileges: ["READ", "WRITE"],
    startDate: new Date(),
};
function add(n1, n2) {
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
const result = add('Francis', 'Utz');
result.split(' ');
const fetchedUserdata = {
    id: 'u1',
    name: 'Francis',
    job: { title: 'CEO', description: 'My Own Company' }
};
console.log((_a = fetchedUserdata === null || fetchedUserdata === void 0 ? void 0 : fetchedUserdata.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput = null;
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'DEFAULT';
function printEmpInformation(emp) {
    console.log(emp.name);
    if ("privileges" in emp)
        console.log(emp.privileges);
}
class Car {
    drive() {
        console.log("Driving");
    }
}
class Truck {
    drive() {
        console.log("Driving a truck");
    }
    loadCargo(amount) {
        console.log("Loading cargo: " + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck)
        vehicle.loadCargo(12);
}
printEmpInformation(e1);
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
    }
    console.log("Moving at speed: " + speed);
}
moveAnimal({ type: "horse", runningSpeed: 12 });
const userInputElement = document.getElementById("user-output");
if (userInputElement)
    userInputElement.value = "Hi!";
const errorBag = {
    email: "Not a valid email!",
    username: "Muse start with a capital character!",
};
//# sourceMappingURL=app.js.map