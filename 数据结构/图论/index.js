import { Queue } from './queue.js'
class Graph {
  constructor() {
    this.vertex = [] // 顶点
    this.edge = new Map() // 边
  }
  // 添加顶点
  addVertex(v) {
    this.vertex.push(v)
    this.edge.set(v, [])
  }
  // 添加边
  addEdge(v1, v2) {
    this.edge.get(v1).push(v2)
    this.edge.get(v2).push(v1)
  }
  // toString
  toString() {
    let tempString = ''
    for (let i = 0; i < this.vertex.length; i++) {
      tempString += this.vertex[i] + '===>'
      const tempArr = this.edge.get(this.vertex[i])
      for (let j = 0; j < tempArr.length; j++) {
        tempString += tempArr[j] + '\0'
      }
      tempString += '\n'
    }
    // console.log(tempString)
    return tempString
  }
  // 初始化颜色
  initColor() {
    const colorMsg = {}
    this.vertex.forEach((v) => (colorMsg[v] = 'white'))
    return colorMsg
  }
  // 宽度优先搜索
  bfs(v) {
    const colorMsg = this.initColor() // 将所有顶点的颜色初始化为白色
    const queue = new Queue()
    queue.push(v)
    while (!queue.isEmpty()) {
      const outVertex = queue.shift()
      const adjacentVertex = this.edge.get(outVertex)
      adjacentVertex.forEach((item) => {
        if (colorMsg[item] === 'white') {
          queue.push(item)
          colorMsg[item] = 'grey'
        }
      })
      colorMsg[outVertex] = 'black'
      console.log(outVertex)
    }
  }
  // 深度优先搜索
  dfs(v) {
    const colorMsg = this.initColor()
    this.dfsVisit(v, colorMsg)
  }
  // 递归方法
  dfsVisit(v, colorMsg) {
    colorMsg[v] = 'grey'
    console.log(v)
    const adjacentVertex = this.edge.get(v)
    adjacentVertex.forEach((item) => {
      if (colorMsg[item] === 'white') {
        this.dfsVisit(item, colorMsg)
      }
    })
    colorMsg[v] = 'black'
  }
}

const graph = new Graph()
const vertexList = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
vertexList.forEach((v) => graph.addVertex(v))
graph.addEdge('A', 'B')
graph.addEdge('A', 'D')
graph.addEdge('B', 'C')
graph.addEdge('C', 'D')
graph.addEdge('C', 'E')
graph.addEdge('C', 'F')
graph.addEdge('E', 'F')
graph.addEdge('F', 'G')
graph.dfs('A')
