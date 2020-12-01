// 思路：将要改变this指向的方法挂到目标this上执行并返回
var name = '小王', age = 17;
var obj = {
    name: '小张',
    objAge: this.age,
    myFun: function (address) {
        console.log(this.name + "的年龄： " + this.age + "地址：" + address);
    }
}

let db = {
    name: "德邦",
    age: 50
}

Function.prototype._bind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('not function')
    }

    console.log(context)
    console.log(arguments)

    context = context || window
    context.fn = this;

    return function () {

    }
}

obj.myFun._apply(db, ['上海', '北京'])