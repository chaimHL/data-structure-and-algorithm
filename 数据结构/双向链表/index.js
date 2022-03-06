// 结点
class Node {
  constructor(data) {
    this.data = data
    this.pre = null
    this.next = null
  }
}
// 双向链表
class DoubleLinkedList {
  constructor() {
    // 属性
    this.head = null
    this.tail = null
    this.length = 0
  }
  // append，向末尾添加结点
  append(data) {
    // 创建结点
    const node = new Node(data)
    if (this.head === null) {
      // 插入的是首结点
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.pre = this.tail
      this.tail = node
    }
    this.length++
  }

  // insert，添加结点（增）
  insert(data, index = this.length) {
    // 越界判断
    if (index < 0 || index > this.length) throw Error('输入的 index 无效')
    const node = new Node(data)
    // 1.添加的位置在链表头
    if (index === 0) {
      if (this.length === 0) {
        // a.链表原本为空
        this.head = node
        this.tail = node
      } else {
        // b.链表原本有结点
        node.next = this.head
        this.head.pre = node
        this.head = node
      }
    } else if (index === this.length) {
      // 2.添加的位置在链表尾
      this.tail.next = node
      node.pre = this.tail
      this.tail = node
    } else {
      // 3.添加的位置在中间
      let current = this.head
      for (let i = 0; i < index; i++) {
        current = current.next
      }
      current.pre.next = node
      node.pre = current.pre
      node.next = current
      current.pre = node
    }
    this.length++
  }
  // removeAt，删除结点（删）
  removeAt(index) {
    if (index < 0 || index >= this.length) throw Error('请输入正确的 index')
    // 1.删除首结点
    let current = this.head
    if (index === 0) {
      // a.链表原本只有 1 个结点
      if (this.length === 1) {
        this.head = null
        this.tail = null
      } else {
        // b.链表原本不止 1 个结点
        this.head = this.head.next
        this.head.pre = null
      }
    } else if (index === this.length - 1) {
      // 2.删除尾结点
      current = this.tail
      this.tail = this.tail.pre
      this.tail.next = null
    } else {
      // 3.删除中间结点
      for (let i = 0; i < index; i++) {
        current = current.next
      }
      current.next.pre = current.pre
      current.pre.next = current.next
    }
    this.length--
    return current
  }
  // get，查询结点（查）
  get(index) {
    if (index < 0 || index >= this.length) throw Error('请输入正确的 index')
    let current = null
    if (index <= this.length / 2) {
      // index 小于结点数的一半，从前往后查
      current = this.head
      for (let i = 0; i < index; i++) {
        current = current.next
      }
    } else {
      // index 比较大，由后往前查
      current = this.tail
      for (let i = this.length - 1; i > index; i--) {
        current = current.pre
      }
    }
    return current.data
  }
  // update，修改结点（改）
  updata(index, data) {
    if (index < 0 || index >= this.length) throw Error('请输入正确的 index')
    let current = null
    let i = null
    if (index <= this.length / 2) {
      // index 小于结点数的一半，从前往后
      current = this.head
      i = 0
      while (i++ < index) {
        current = current.next
      }
    } else {
      // index 比较大，由后往前
      current = this.tail
      i = this.length - 1
      while (i-- > index) {
        current = current.pre
      }
    }
    current.data = data
    return true
  }
}
// 测试
const doubleLinkedList = new DoubleLinkedList()
doubleLinkedList.append(0)
doubleLinkedList.append(1)
doubleLinkedList.append(2)
doubleLinkedList.append(3)
console.log(doubleLinkedList)
console.log(doubleLinkedList.updata(2, 'a'))
