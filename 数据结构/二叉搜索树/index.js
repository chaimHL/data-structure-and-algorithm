class CreateNode {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }
  // 增
  insert(key) {
    const newNode = new CreateNode(key)
    this.insertNode(newNode, this.root)
  }
  insertNode(newNode, node) {
    // 1.判断原来根节点有没有值
    if (this.root) {
      // 有值
      if (node.key > newNode.key) {
        // 如果新节点的 key 更小，则放在左边，判断 node 的 left 是否有值
        if (node.left) {
          this.insertNode(newNode, node.left)
        } else {
          node.left = newNode
        }
      } else {
        // 新节点的 key 更大，放右边
        if (node.right) {
          this.insertNode(newNode, node.right)
        } else {
          node.right = newNode
        }
      }
    } else {
      // 没值
      this.root = newNode
    }
  }

  // 查 - 先序遍历
  preOrder() {
    this.preOrderNode(this.root)
  }
  preOrderNode(node) {
    if (node) {
      // 如果节点存在
      console.log('key', node.key)
      this.preOrderNode(node.left)
      console.log(`开始遍历${node.key}的的右节点`)
      this.preOrderNode(node.right)
    } else {
      // 如果节点不存在
      return
    }
  }

  // 查 - 中序遍历
  midOrder() {
    this.midOrderNode(this.root)
  }
  midOrderNode(node) {
    if (node) {
      this.midOrderNode(node.left)
      console.log('key', node.key)
      this.midOrderNode(node.right)
    } else {
      return
    }
  }

  // 查 - 后序遍历
  postOrder() {
    this.postOrderNode(this.root)
  }
  postOrderNode(node) {
    if (node) {
      this.postOrderNode(node.left)
      this.postOrderNode(node.right)
      console.log('key', node.key)
    } else {
      return
    }
  }

  // 查 - 最小值
  min() {
    let node = this.root
    while (node?.left) {
      node = node.left
    }
    return node ? node.key : null
  }

  // 查 - 最大值
  max() {
    let node = this.root
    while (node?.right) {
      node = node.right
    }
    return node ? node.key : null
  }

  // 查 - 某个特定 key 值
  search(key) {
    if (this.root) {
      return this.serachNode(this.root, key)
    } else {
      return false
    }
  }
  serachNode(node, key) {
    if (node.key === key) {
      return true
    } else {
      node = node.key > key ? node.left : node.right
    }
    if (node) {
      // return this.serachNode(node, key)
      this.serachNode(node, key)
    } else {
      return false
    }
  }

  // 删
  remove(key) {
    // 查找 key 所在的节点
    let parent = null,
      current = this.root,
      isLeft = false
    while (key !== current.key) {
      parent = current
      if (key < current.key) {
        current = current.left
        isLeft = true
      } else {
        current = current.right
        isLeft = false
      }
      // 如果找到最后也没找到，说明不存在该 key。直接返回 false
      if (current === null) return false
    }
    // 如果找到了，则分几种情况处理
    // 1.要删除的节点为叶节点（没有子节点）
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null
      } else {
        isLeft ? (parent.left = null) : (parent.right = null)
      }
    } else if (current.right === null) {
      // 2.1 要删除的节点只有一个左子节点
      if (current === this.root) {
        this.root = current.left
      } else {
        isLeft ? (parent.left = current.left) : (parent.right = current.left)
      }
    } else if (current.left === null) {
      // 2.2 要删除的节点只有一个右子节点
      if (current === this.root) {
        this.root = current.right
      } else {
        isLeft ? (parent.left = current.right) : (parent.right = current.right)
      }
    } else {
      // 3.要删除的节点有 2 个子节点
      // 先找到该节点，这里我们寻找该节点的后继节点
      let successor = this.getSuccessorNode(current)
      // 先判断要删除的节点是否为根节点
      if (current === this.root) {
        this.root = successor
      } else {
        isLeft ? (parent.left = successor) : (parent.right = successor)
      }
      successor.left = current.left
    }
    return true
  }

  // 寻找后继节点
  getSuccessorNode(removeNode) {
    let successor = removeNode,
      cur = removeNode.right,
      sucParent = removeNode
    while (cur) {
      sucParent = successor
      successor = cur
      cur = cur.left
    }
    if (removeNode.right !== successor) {
      sucParent.left = successor.right
      successor.right = removeNode.right
    }
    return successor
  }
}

const bst = new BinarySearchTree()
bst.insert(7)
bst.insert(4)
bst.insert(3)
bst.insert(5)
bst.insert(11)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(15)
bst.insert(13)
bst.insert(18)
bst.insert(14)
