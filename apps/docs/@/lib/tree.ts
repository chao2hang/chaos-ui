/**
 * Tree data structure utilities.
 * @since 0.2.0
 */

interface TreeNode {
  id: string | number
  parentId?: string | number | null
  children?: TreeNode[]
  [key: string]: unknown
}

/**
 * Convert a flat array (with id/parentId) to a nested tree.
 * Root nodes are those with parentId === null/undefined or parentId not found.
 */
export function arrayToTree<T extends TreeNode>(
  items: T[],
  options: {
    idKey?: string
    parentKey?: string
    childrenKey?: string
    rootParentId?: string | number | null
  } = {},
): T[] {
  const {
    idKey = "id",
    parentKey = "parentId",
    childrenKey = "children",
    rootParentId,
  } = options

  const idMap = new Map<string | number, T>()
  const roots: T[] = []

  // Index all items
  for (const item of items) {
    idMap.set(item[idKey] as string | number, { ...item, [childrenKey]: [] })
  }

  // Build tree
  for (const item of items) {
    const node = idMap.get(item[idKey] as string | number)!
    const parentId = item[parentKey] as string | number | null | undefined

    if (
      parentId == null ||
      parentId === rootParentId ||
      !idMap.has(parentId)
    ) {
      roots.push(node)
    } else {
      const parent = idMap.get(parentId)
      if (parent) {
        const children = parent[childrenKey] as T[]
        children.push(node)
      }
    }
  }

  return roots
}

/**
 * Flatten a nested tree back to an array.
 */
export function treeToArray<T extends TreeNode>(
  tree: T[],
  options: {
    childrenKey?: string
  } = {},
): T[] {
  const { childrenKey = "children" } = options
  const result: T[] = []

  const walk = (nodes: T[]) => {
    for (const node of nodes) {
      const { [childrenKey]: children, ...rest } = node
      result.push(rest as T)
      if (Array.isArray(children)) {
        walk(children as T[])
      }
    }
  }

  walk(tree)
  return result
}

/**
 * Find a node in a tree by predicate.
 */
export function findInTree<T extends TreeNode>(
  tree: T[],
  predicate: (node: T) => boolean,
  childrenKey = "children",
): T | undefined {
  for (const node of tree) {
    if (predicate(node)) return node
    const children = node[childrenKey] as T[] | undefined
    if (children?.length) {
      const found = findInTree(children, predicate, childrenKey)
      if (found) return found
    }
  }
  return undefined
}

/**
 * Get the full path (ancestors) of a node by id.
 */
export function getPathById<T extends TreeNode>(
  tree: T[],
  targetId: string | number,
  idKey = "id",
  childrenKey = "children",
): T[] {
  const result: T[] = []

  const walk = (nodes: T[], path: T[]): boolean => {
    for (const node of nodes) {
      const currentPath = [...path, node]
      if (node[idKey] === targetId) {
        result.push(...currentPath)
        return true
      }
      const children = node[childrenKey] as T[] | undefined
      if (children?.length && walk(children, currentPath)) {
        return true
      }
    }
    return false
  }

  walk(tree, [])
  return result
}

/**
 * Get all leaf nodes from a tree.
 */
export function getLeafNodes<T extends TreeNode>(
  tree: T[],
  childrenKey = "children",
): T[] {
  const leaves: T[] = []

  const walk = (nodes: T[]) => {
    for (const node of nodes) {
      const children = node[childrenKey] as T[] | undefined
      if (!children?.length) {
        leaves.push(node)
      } else {
        walk(children)
      }
    }
  }

  walk(tree)
  return leaves
}

export type { TreeNode }
