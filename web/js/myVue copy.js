/**
     * 把一个对象的每一项都转化成可观测对象
     * @param { Object } obj 对象
     */
function observable (obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
    return obj;
}
/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive (obj, key, val) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        get () {
            dep.depend();
            console.log(`${key}属性被读取了`);
            return val;
        },
        set (newVal) {
            val = newVal;
            console.log(`${key}属性被修改了`);
            dep.notify()                    //数据变化通知所有订阅者
        }
    })
}
class Dep {

    constructor() {
        debugger
        this.subs = []
    }
    //增加订阅者
    addSub (sub) {
        this.subs.push(sub);
    }
    //判断是否增加订阅者
    depend () {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    //通知订阅者更新
    notify () {
        this.subs.forEach((sub) => {
            sub.update()
        })
    }

}
Dep.target = null;







class Watcher {
    constructor(vm, exp, cb) {
        debugger
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.value = this.get();  // 将自己添加到订阅器的操作
    }
    get () {
        debugger
        Dep.target = this;  // 缓存自己
        let value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
    update () {
        let value = this.vm.data[this.exp];
        let oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    }
}












// /* let car = {
//          'brand': "BMW",
//          'price': 3000
//      }; */

// /*    let car = {};
//    let val = 3000;


//    Object.defineProperty(car, 'price', {

//        get() {
//            console.log('price属性被读取了');
//            return val;
//        },
//        set(newVal) {
//            console.log('price属性被改变了');
//            val = newVal;
//        }
//    }) */


// function observable (obj) {
//     if (!obj || typeof obj !== "object") {
//         return;
//     }

//     let keys = Object.keys(obj);
//     keys.forEach(key => {
//         defineReactive(obj, key, obj[key])
//     })

//     return obj;
// }



// function defineReactive (obj, key, val) {

//     let dep = new Dep();

//     Object.defineProperty(obj, key, {
//         get () {
//             dep.depend();
//             console.log(`${key}属性被读取了`);
//             return val;
//         },
//         set (newVal) {
//             console.log(`${key}属性被改变了`);
//             val = newVal;
//             dep.notify();
//         }
//     })
// }


// class Dep {
//     constructor() {
//         debugger
//         this.subs = [];
//     }

//     //增加订阅者
//     addSub (sub) {
//         this.subs.push(sub);
//     }

//     //判断是否增加订阅者
//     depend () {
//         if (Dep.target) {
//             this.addSub(Dep.target);
//         }
//     }

//     //通知订阅者更新
//     notify () {
//         this.subs.forEach(sub => {
//             sub.update();
//         })
//     }
// }

// Dep.target = null;


// class Watcher {
//     constructor(vm, exp, cb) {
//         debugger
//         this.vm = vm; // vm:一个Vue的实例对象；
//         this.exp = exp; // exp:是node节点的v-model或v-on：click等指令的属性值。如v-model="name"，exp就是name;
//         this.cb = cb; // cb:是Watcher绑定的更新函数;
//         this.value = this.get();
//     }

//     get () {
//         debugger
//         Dep.target = this;
//         let value = this.vm.data[this.exp];
//         Dep.target = null;
//         return value;
//     }

//     update () {
//         let value = this.vm.data[exp];
//         let oldVal = this.value;

//         if (value != oldVal) {
//             this.value = value;
//             this.cb.call(this.vm, value, oldVal)
//         }
//     }


// }