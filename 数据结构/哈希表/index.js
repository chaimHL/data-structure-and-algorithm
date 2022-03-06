class HashTable {
  constructor() {
    this.storage = []
    this.size = 11
    this.count = 0
  }
  // 下面添加方法
  // 哈希函数
  hashFn(str, size) {
    let hashCode = 0
    for (let i = 0; i < str.length; i++) {
      hashCode = hashCode * 37 + str.charCodeAt(i)
    }
    return hashCode % size
  }
  // 增 & 改
  update(key, value) {
    // 1.获取下标
    const index = this.hashFn(key, this.size)
    // 2.判断该位置是否存在数组
    let bucket = this.storage[index]
    // 如果没有数组则添加个空数组
    if (!bucket) {
      this.storage[index] = bucket = []
    }
    // 有数组则进行循环遍历
    for (let i = 0; i < bucket.length; i++) {
      // 是否存储了 key 值相等的元素
      if (key === bucket[i][0]) {
        // 有则修改
        bucket[i][1] = value
        return
      }
    }
    // 没有则添加
    bucket.push([key, value])
    this.count++
    // 检查是否需要扩容
    if (this.count > this.size * 0.75) this.resize(this.getPrime(this.size * 2))
  }
  // 查
  find(key) {
    // 1.获取下标
    const index = this.hashFn(key, this.size)
    // 2.判断该位置是否存在数组
    let bucket = this.storage[index]
    if (bucket) {
      // 原本存在数组
      const found = bucket.find((item) => item[0] === key)
      return found ? found[1] : undefined
    } else {
      // 原本不存在数组
      return undefined
    }
  }
  // 删
  remove(key) {
    const index = this.hashFn(key, this.size)
    let bucket = this.storage[index]
    if (bucket) {
      const index = bucket.findIndex((item) => item[0] === key)
      if (index !== -1) {
        // 原本存在数组并且数组中存在第 0 项等于 key 的元素
        this.count--
        // 检查是否需要缩容
        if (this.size > 11 && this.count < this.size * 0.25) {
          this.resize(this.getPrime(Math.floor(this.size / 2)))
        }
        return bucket.splice(index, 1)[0]
      }
    }
    // 没有删除元素则返回空数组
    return []
  }
  // 扩容 & 缩容
  resize(newSize) {
    // 先将原本的 storage 的值保存起来
    const oldStorage = this.storage
    // 然后进行改变容量的操作
    this.storage = []
    this.size = newSize
    this.count = 0
    // 将所有存储的数据重新放入新的 storage
    oldStorage.forEach((bucket) => {
      if (bucket) bucket.forEach((item) => this.update(item[0], item[1]))
    })
  }
  // 得到质数
  getPrime(num) {
    while (!this.isPrime(num)) {
      num++
    }
    return num
  }
  // 判断质数
  isPrime(num) {
    // 获取 num 的平方根
    const squareRoot = Math.sqrt(num)
    for (let i = 2; i <= squareRoot; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }
}

// 测试
const hashTable = new HashTable()
hashTable.update('Jay', { name: 'Jay', age: 22 }) // 10
hashTable.update('Zhou', { name: 'Zhou', age: 23 }) // 10
// hashTable.update('Chaim', { name: 'Chaim', age: 28 }) // 6
// hashTable.update('Chaim1', { name: 'Chaim1', age: 29 }) // 7
// hashTable.update('Chaim2', { name: 'Chaim2', age: 29 })
// hashTable.update('Chaim3', { name: 'Chaim3', age: 29 })
// hashTable.update('a', 'a')
// hashTable.update('b', 'b')
// hashTable.update('c', 'c')
console.log(hashTable)
