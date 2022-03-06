export function Queue() {
  this.items = []
  // 入队
  Queue.prototype.push = function (item) {
    this.items.push(item)
  }
  // 出队
  Queue.prototype.shift = function () {
    return this.items.shift()
  }
  // 查看队列第一个元素
  Queue.prototype.first = function () {
    return this.items[0]
  }
  // 检查队列是否为空
  Queue.prototype.isEmpty = function () {
    return this.items.length === 0
  }
  // 将队列内容转成字符串
  Queue.prototype.toString = function () {
    return this.items.toString()
  }
}

// 击鼓传花
function drinkingGame(crowd, number) {
  // new 一个队列实例
  const queue = new Queue()
  // 将 crowd 里的每一项都放入队列中
  crowd.forEach((item) => queue.push(item))
  while (crowd.length > 1) {
    // 只要是小于 number 的那一项，就从队列取出，再放回队列中
    for (let index = 0; index < number - 1; index++) {
      crowd.push(crowd.shift())
    }
    // 将 for 循环前的第 number 项删除（也就是现在的队列的首项）
    crowd.shift()
  }
  // console.log(crowd.toString())
}
drinkingGame(['Rng', 'T1', 'EDG', 'DWG', 'FPX'], 7)

// 优先级队列
function PriorityQueue() {
  // 先创建一个 Item 构造函数，用于创建加入优先级队列的元素
  function Item(item, p) {
    this.element = item
    this.priority = p
  }
  // 继承队列 Queue 的属性
  Queue.call(this)
  // 重写属于优先级队列 push 方法
  PriorityQueue.prototype.push = function (newItem, p) {
    const item = new Item(newItem, p)
    // 如果队列为空，则直接将新元素加入
    if (this.isEmpty()) {
      this.items.push(item)
    } else {
      let isPush = false // 记录是否插入成功
      // 如果遇到优先级比自己的低（priority 更大）的则插入到该元素之前
      for (let index = 0; index < this.items.length; index++) {
        if (item.priority < this.items[index].priority) {
          this.items.splice(index, 0, item)
          isPush = true
          break
        }
      }
      // 如果优先级都比自己高
      if (!isPush) {
        this.items.push(item)
      }
    }
  }
}
// 继承队列 Queue 的方法
PriorityQueue.prototype = Object.create(Queue.prototype)

// 测试
const priorityQueue = new PriorityQueue()
priorityQueue.push('五级 bug', 5)
priorityQueue.push('一级 bug', 1)
priorityQueue.push('三级 bug', 3)
priorityQueue.push('二级 bug', 2)
