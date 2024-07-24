"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prodcut_model_1 = require("./prodcut.model");
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const p1 = new prodcut_model_1.Product('', -5.99);
const products = [
    { title: 'A Laptop', price: 2999.99 },
    { title: 'A Watch', price: 499.99 }
];
const loadedProduct = (0, class_transformer_1.plainToInstance)(prodcut_model_1.Product, products);
for (const pro of loadedProduct)
    console.log(pro.getInformation());
(0, class_validator_1.validate)(p1).then(errors => {
    if (errors.length > 0) {
        console.log('Error: ', errors);
    }
    else {
        console.log(p1);
    }
});
//# sourceMappingURL=app.js.map