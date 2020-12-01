// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

let object = new String('this is string')

// 每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）

console.log(object.__proto__)
console.log(object.__proto__ === object.constructor.prototype === String.prototype)

