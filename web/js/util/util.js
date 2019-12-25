function dateFormat (date, format = "YYYY-MM-DD HH:mm:ss") {
    const config = {
        YYYY: date.getFullYear(),
        MM: date.getMonth() + 1,
        DD: date.getDay(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds()

    }

    for (const key in config) {
        format = format.replace(key, config[key]);
    }

    return format;
}

const date = new Date('2019-11-10 12:22:10')
dateFormat(date, 'YYYY年MM月DD日')


function bbb (a, b, c) {
    console.log(1)
    console.log(a)
    console.log(2)
    console.log(b)
    console.log(3)
    console.log(c)
}