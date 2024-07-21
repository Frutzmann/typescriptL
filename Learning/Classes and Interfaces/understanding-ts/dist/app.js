"use strict";
var Person = (function () {
    function Person(n) {
        this.name = n;
    }
    Person.prototype.greet = function (phrase) {
        console.log("".concat(phrase, " ").concat(this.name));
    };
    return Person;
}());
var add;
add = function (n1, n2) {
    return n1 + n2;
};
var user1;
user1 = new Person('Francis');
user1.greet('Hi - My name is');
//# sourceMappingURL=app.js.map