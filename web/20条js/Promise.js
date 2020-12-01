// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
class Promise {
    constructor(fn) {
        // 三个状态
        this.state = 'pending'
        this.value = undefined
        this.reason = undefined
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
            }
        }
        let reject = value => {
            if (this.state === 'pending') {
                this.state = 'rejected'
                this.reason = value
            }
        }
        // 自动执行函数
        try {
            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    // then
    then(onFulfilled, onRejected) {
        switch (this.state) {
            case 'fulfilled':
                onFulfilled(this.value)
                break
            case 'rejected':
                onRejected(this.reason)
                break
            default:
        }
    }
}

new MyPromise(function (resolve, reject) {

})

// 是个类
// 有构造方法，接收一个函数
// 有个then方法，有个catch方法
class MyPromise {

    constructor(fn) {
        this.state = 'pending'
        this.value = undefined
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled'
                this.value = value
            }
        }

        let reject = value => {
            if (this.state === 'rejected') {
                this.state = 'rejected'
                this.value = value
            }
        }

        try {

            fn(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }


}



