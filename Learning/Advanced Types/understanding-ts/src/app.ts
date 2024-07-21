// Code goes here!
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

// Intersection Types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Francis",
  privileges: ["READ", "WRITE"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;


//Function Overloead
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

const result = add('Francis', 'Utz');
result.split(' ');


//Optional Chaining
const fetchedUserdata = {
    id: 'u1',
    name: 'Francis',
    job: {title: 'CEO', description: 'My Own Company'}
};

console.log(fetchedUserdata?.job?.title)

//Nullish Coalesching
const userInput = null;
const storedData = userInput ?? 'DEFAULT'; // null of undefined

type UnknownEmployee = Employee | Admin;

function printEmpInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  if ("privileges" in emp) console.log(emp.privileges);
}

// Type Guards
class Car {
  drive() {
    console.log("Driving");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo: " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) vehicle.loadCargo(12);
}

printEmpInformation(e1);
useVehicle(v1);
useVehicle(v2);

// Discriminated unions pattern
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;
// Discriminated Unions => Useful pattern for 100% type safety
function moveAnimal(animal: Animal) {
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

//Type Casting
const userInputElement = document.getElementById(
  "user-output"
) as HTMLInputElement;

if (userInputElement) userInputElement.value = "Hi!";

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Muse start with a capital character!",
}
