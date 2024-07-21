interface AddFn {
    (a: number, b: number): number; 
}

interface Named {
    readonly name: string; 
    outputName?: string; 
}

interface Greetable extends Named { // Can be use as a contract
     //must only be set once
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`)
    }
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

let user1: Greetable;

user1 = new Person('Francis');

user1.greet('Hi - My name is');