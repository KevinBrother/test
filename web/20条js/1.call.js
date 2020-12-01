// 思路：将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.mycall = function (context) {
    debugger
    if (typeof this !== 'function') {
        throw new TypeError('not funciton')
    }
    context = context || window
    context.fn = this
    let arg = [...arguments].slice(1)
    let result = context.fn(...arg)
    delete context.fn
    return result
}

var name = '小王', age = 17;
var obj = {
    name: '小张',
    objAge: this.age,
    myFun: function (address) {
        console.log(this.name + "的年龄： " + this.age + "地址：" +address);
    }
}

/*console.log(obj.objAge);
obj.myFun();*/

let db = {
    name: "德邦",
    age: 50
}
obj.myFun.call(db)
obj.myFun.mycall(db)

Function.prototype._call = function(context){
    if(typeof this !== 'function'){
        throw new TypeError('not function')
    }

    console.log(context)
    console.log(arguments)

    context = context || window
    context.fn = this;
    let arg = [...arguments].slice(1)

    let result = context.fn(...arg)

    delete context.fn;

    return result;
}

obj.myFun._call(db, '上海')