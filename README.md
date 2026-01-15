# @10xly/is-instance-of
check if somethings an instance of something else. p]

## Instawation
```bash
npm install @10xly/is-instance-of
```

## Usage
```js
const isInstanceOf = require("@10xly/is-instance-of")

class Animal {}
class Dog extends Animal {}
const pet = new Dog()

// Check by Constructor
isInstanceOf(pet, Dog) // true
isInstanceOf(pet, Animal) // true

// Check by Name (String)
isInstanceOf(pet, "Dog") // true

// Multiple options
isInstanceOf(pet, ["Cat", "Dog"]) // true
```

## Why you might use this seriously
This is a version of `is-instance-of` by lamansky that resolves a vulnerability in lodash.set. However, it is a little overengineered, but this actually has a practical purpose. [see the readme of is-instance-of for more info](https://github.com/lamansky/is-instance-of)