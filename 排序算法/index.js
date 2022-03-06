class ArrayList {
  constructor() {
    this.arr = []
  }
  insert(item) {
    this.arr.push(item)
  }
  toString() {
    return this.arr.join()
  }
  // 交换顺序
  exchangeOrder(m, n) {
    const temp = this.arr[n]
    this.arr[n] = this.arr[m]
    this.arr[m] = temp
  }
  // 冒泡排序
  bubbleSort() {
    const length = this.arr.length
    for (let i = length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (this.arr[j] > this.arr[j + 1]) {
          this.exchangeOrder(j, j + 1)
        }
      }
    }
  }
  // 选择排序
  selectionSort() {
    const length = this.arr.length
    for (let i = 1; i < length; i++) {
      let tempMinIndex = i - 1
      for (let j = i; j < length; j++) {
        if (this.arr[j] < this.arr[tempMinIndex]) {
          tempMinIndex = j
        }
      }
      this.exchangeOrder(i - 1, tempMinIndex)
    }
  }
  // 插入排序
  insertionSort() {
    const length = this.arr.length
    for (let i = 1; i < length; i++) {
      const temp = this.arr[i]
      let j = i
      while (this.arr[j - 1] > temp && j > 0) {
        this.arr[j] = this.arr[j - 1]
        j--
      }
      this.arr[j] = temp
    }
  }
  // 希尔排序
  shellSort() {
    const length = this.arr.length
    let gap = Math.floor(length / 2)
    for (gap; gap >= 1; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < length; i++) {
        const temp = this.arr[i]
        let j = i
        while (this.arr[j - gap] > temp && j >= gap) {
          this.arr[j] = this.arr[j - gap]
          j -= gap
        }
        this.arr[j] = temp
      }
    }
  }

  // 寻找基准值
  findBaseVal(i, j) {
    const midIndex = Math.floor((i + j) / 2)
    // 取数组第 1 个、中间 1 个和最后 1 个元素，并进行排序
    if (this.arr[i] > this.arr[midIndex]) this.exchangeOrder(i, midIndex)
    if (this.arr[i] > this.arr[j]) this.exchangeOrder(i, j)
    if (this.arr[midIndex] > this.arr[j]) this.exchangeOrder(midIndex, j)
    // 将中间这个数与右边这个的前一个进行交换，并作为分割数组的基准值
    // 注意要判断下从 i 到 j 加起来有没有多于 3 个数
    if (j - i > 2) this.exchangeOrder(midIndex, j - 1)
    return this.arr[j - 1]
  }
  // 快速排序
  quickSort() {
    this.qSort(0, this.arr.length - 1)
  }
  // 快速排序递归方法
  qSort(leftKey, rightKey) {
    if (leftKey >= rightKey) return
    const baseVal = this.findBaseVal(leftKey, rightKey)
    let i = leftKey,
      j = rightKey - 1
    while (i < j) {
      // 对于指针 i，找到比基准值大的则停止循环
      while (i < j && this.arr[++i] < baseVal) {}
      // 对于指针 j，要找到比基准值小的
      while (i < j && this.arr[--j] > baseVal) {}
      // 找到了则交换位置
      if (i < j) this.exchangeOrder(i, j)
    }
    // 一旦 i 等于 j ，则外面这层 while 循环停止，将基准值和 j 位置的元素调换
    this.exchangeOrder(j, rightKey - 1)
    // 以基准作为分割，分别对左边和右边再次进行快速排序
    this.qSort(leftKey, j - 1)
    this.qSort(j + 1, rightKey)
  }
}

const arrayList = new ArrayList()
arrayList.insert(5)
arrayList.insert(10)
arrayList.insert(6)
arrayList.insert(8)
arrayList.insert(1)

arrayList.shellSort()
console.log(arrayList.toString())
