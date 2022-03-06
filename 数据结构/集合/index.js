class Set {
  constructor() {
    this.items = {}
  }
  // add(value)，添加元素 value
  add(value) {
    if (this.has(value)) return false
    this.items[value] = value
    return this.items
  }
  // has(value)，查询元素是否存在
  has(value) {
    return this.items.hasOwnProperty(value)
  }
  // delete(value)，删除元素
  delete(value) {
    if (this.has(value)) {
      delete this.items[value]
      return true
    } else {
      return false
    }
  }
  // clear()，清空集合
  clear() {
    this.items = {}
  }
  // values()，获取集合中的所有元素
  values() {
    return Object.keys(this.items)
  }
  // size()，获取集合中元素的个数
  size() {
    return this.values().length
  }
  // union(set)，将传入的集合 set 与实例本身做并集操作
  union(set) {
    const newSet = new Set()
    const valuesA = this.values()
    for (let i = 0; i < valuesA.length; i++) {
      newSet.add(valuesA[i])
    }
    set.values().reduce((pre, cur) => {
      pre.add(cur)
      return pre
    }, newSet)
    return newSet
  }
  // intersection(set)，将传入的集合 set 与实例本身进行交集操作
  intersection(set) {
    const newSet = new Set()
    this.values().reduce((pre, cur) => {
      if (set.has(cur)) pre.add(cur)
      return pre
    }, newSet)
    return newSet
  }
}

const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)

const setB = new Set()
setB.add('a')
setB.add('b')
setB.add('c')
setB.add(3)
const newSet = setA.intersection(setB)

console.log(newSet)
