//Generics
//Generics = better type safety
//Generic help get additional type info on data coming on complex
//Structures
const names: Array<string> = [];

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("This is done");
  }, 2000);
});

//Building our own Generic Function
//Generics are about filling concrete types for different function calls
//Type constraints are now mandatory i think
//(contraints = extends that guarantees the type)
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Francis" }, { age: 30 });

//Another Generic

interface Lengthy {
  length: number;
}

//We don't car of element type. We just care that it does have a length property.
//We have no interest on which type function is processing
//It's very powerful
function countAndPrint<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value";
  if (element.length > 0) descriptionText = "Got 1 element.";
  if (element.length > 1) descriptionText = `Got ${element.length} elements.`;
  return [element, descriptionText];
}
console.log(countAndPrint([1, 2, 3, 4]));

//keyof Constraint
//Generics ensure we have the correct structure
//Generics are mainly powerful when we don't care of the Type
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

//Generic classes
//Generic are flexible and still strongly typed structures
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Francis");
textStorage.addItem("Ismail");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

//Gererics = flexibility with type safety

//Generic Utility Types
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const firstnames: Readonly<string[]> = ['Francis', 'Nana'];

//Generic vs Union
//Generic = lock in a type for a specific scope
//Union = flexibility of different type 
