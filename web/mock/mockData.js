var Random = Mock.Random
var url = {
        arr: "http://127.0.0.1:8080/arr", 
        result: "http://127.0.0.1:8080/result"
    }
var obj = {
    "name":	   "Tiger Nixon",
	"position":   "System Architect",
	"salary":	 "$3,120",
	"start_date": "2011/04/25",
	"office":	 "Edinburgh",
	"extn":	   "5421"
}

var arr=[
    {name:'fei',age:20,id:1},
    {name:'liang',age:30,id:2},
    {name:'jun',age:40,id:3},
    {name:'ming',age:50,id:4}
]

var result = {
    status: 'succ',
    total: '300',
    'custs|300': [{
        'name': '@cname(4)', // 生成姓名  
        age: '@integer(1, 50)',
        'Boolean': Random.boolean, // 可以生成基本数据类型
        'Natural': Random.natural(1, 10), // 生成1到100之间自然数
        'Integer': Random.integer(1, 100), // 生成1到100之间的整数
        'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
        'Character': Random.character(), // 生成随机字符串,可加参数定义规则
        'String': Random.string(2, 10), // 生成2到10个字符之间的字符串
        'Range': Random.range(0, 10, 2), // 生成一个随机数组
        'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
        'Color': Random.color(), // 生成一个颜色随机值
        'Paragraph':Random.paragraph(2, 5), //生成2至5个句子的文本
        'Url': Random.url(), // 生成web地址
        'Address': Random.province() // 生成地址
    }]
} 

Mock.mock(url.arr ,arr)
Mock.mock(url.result ,result)