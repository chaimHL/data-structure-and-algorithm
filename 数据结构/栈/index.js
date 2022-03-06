// 定义一个栈结构的构造函数
function Stack() {
  this.items = []
  // 入栈
  Stack.prototype.push = function (item) {
    this.items.push(item)
  }
  // 出栈
  Stack.prototype.pop = function () {
    return this.items.pop()
  }
  // 判断栈是否为空
  Stack.prototype.isEmpty = function () {
    return this.items.length === 0
  }
}

// 封装一个函数，用于将十进制转换为二进制
function decimalToBinary(num) {
  const stack = new Stack()
  while (num > 0) {
    // 将余数放入栈中
    stack.push(num % 2)
    // 将 num 重新赋值
    num = Math.floor(num / 2)
  }
  // 将栈中的每一项依次取出获得转换结果
  let result = ''
  while (!stack.isEmpty()) {
    result += stack.pop()
  }
  return result
}

const result = decimalToBinary(10)
console.log(result) // 1010
