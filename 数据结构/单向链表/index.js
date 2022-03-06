function LinkList() {
  // 结点
  function Node(data) {
    this.data = data
    this.next = null
  }
  // 属性
  this.head = null
  this.length = 0
  // append 方法
  LinkList.prototype.append = function (data) {
    const node = new Node(data)
    // 判断是否为第一个加入的结点
    if (this.length === 0) {
      this.head = node
    } else {
      // 注意此时 head 指向的是链表的第一个结点
      const current = this.head
      // 当某一个结点的 next 属性有值，说明它不是最后一个结点
      while (current.next) {
        // 将 current 指向下一个结点（也就是这个节点的 next 的值）
        current = current.next
      }
      /**
       * 如果原来链表中所有 next 有值的结点都遍历了，
       * 那么此时 current 指向的就是最后一个结点了，
       * 将新加入的结点赋值给原本最后一个结点的 next
       */
      current.next = node
    }
    this.length++
  }
  // toString
  LinkList.prototype.toString = function () {
    let current = this.head
    let tempString = ''
    while (current) {
      tempString += current.data + ' '
      current = current.next
    }
    return tempString
  }
  // insert, 添加结点（增）
  LinkList.prototype.insert = function (data, position = this.length) {
    // 对 position 进行边界判断
    if (position < 0 || position > this.length)
      throw Error('请传入正确的 position')
    // 创建新结点
    const node = new Node(data)
    // 判断添加的位置是否是第一个
    if (position === 0) {
      node.next = this.head
      this.head = node
    } else {
      let current = this.head
      for (let i = 0; i < position - 1; i++) {
        current = current.next
      }
      /**
       * 循环结束，此时 current 指向的是 position 的前一个结点
       * 可以把 current 就看成 position - 1 处的那个结点
       * 那么 current.next 指向的原本 position 处的结点，此时就是新结点的 next 应该指向的结点
       * 然后再让 current.next 指向新结点
       */
      node.next = current.next
      current.next = node
    }
    this.length++
  }
  // get，获取结点数据（查）
  LinkList.prototype.get = function (position) {
    if (position < 0 || position > this.length - 1)
      throw Error('请传入正确的 position')
    let index = 0
    let current = this.head
    while (index++ < position) {
      current = current.next
    }
    return current.data
  }
  // indexOf，获取结点位置（查）
  LinkList.prototype.indexOf = function (data) {
    let current = this.head
    let index = 0
    while (current) {
      if (current.data === data) return index
      // 如果当前项的 data 不等于传入的 data
      current = current.next
      index++
    }
    // 如果 while 循环没有 return，说明链表中没有 data，返回 -1
    return -1
  }
  // updata，更新结点（改）
  LinkList.prototype.updata = function (newData, position) {
    if (position < 0 || position > this.length - 1)
      throw Error('请传入正确的 position')
    let current = this.head
    for (let i = 0; i < position; i++) {
      current = current.next
    }
    current.data = newData
  }
  // removeAt，删除结点（删）
  LinkList.prototype.removeAt = function (position) {
    if (position < 0 || position > this.length - 1)
      throw Error('请传入正确的 position')
    // current 定义在 if else 外面是为了方便最终返回删除的数据
    let current = this.head
    if (position === 0) {
      this.head = this.head.next
    } else {
      let pre = null // 用于记录被删除结点的前一个结点
      let index = 0
      while (index++ < position) {
        pre = current
        current = current.next
      }
      // 找到 position 处的结点后，让前一个结点指向后一个结点
      pre.next = current.next
    }
    this.length--
    return current.data
  }
  // remove，删除结点（删）
  LinkList.prototype.remove = function (data) {
    // 找到该结点位置
    const position = this.indexOf(data)
    // 通过位置删除结点
    this.removeAt(position)
  }
}

const linkList = new LinkList()

try {
  linkList.insert(5)
  linkList.insert(3, 0)
  linkList.insert(2)
  linkList.insert(8)
  linkList.insert(10, 3)
  console.log(linkList.toString()) // 3 5 2 10 8
  console.log(linkList.removeAt(0))
  console.log(linkList.removeAt(2))
  console.log(linkList.toString())
  console.log(linkList.length)
  linkList.remove(8)
  console.log(linkList.toString())
  console.log(linkList.length)
} catch (error) {
  console.log(error.message)
}
