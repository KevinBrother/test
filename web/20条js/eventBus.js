class EventEmitter {
    constructor() {
        // 存储事件
        this.events = this.events || new Map()
    }

    // 监听事件
    addEventListener(type, fn) {
        this.events.set(type, fn)
    }

    // 触发事件
    emit(type) {
        let handler = this.events.get(type);
        handler.bind(this, [...arguments].slice(1))
    }

}
