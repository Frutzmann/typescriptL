import _ from 'lodash';
import { Product } from "./prodcut.model";
import "reflect-metadata";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const p1 = new Product('', -5.99);
const products = [
    {title: 'A Laptop', price: 2999.99},
    {title: 'A Watch', price: 499.99}
]
const loadedProduct = plainToInstance(Product, products);
for(const pro of loadedProduct)
    console.log(pro.getInformation());

validate(p1).then(errors => {
    if(errors.length > 0) {
        console.log('Error: ', errors);   
    } else {
        console.log(p1);
    }
});



