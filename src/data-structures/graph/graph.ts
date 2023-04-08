import { GraphNode, GraphNodeKey } from "./graph-node"

export type GraphAdjacencyList = Record<
  GraphNodeKey,
  Record<GraphNodeKey, number>
>

export class Graph {
  private nodes: Record<GraphNodeKey, GraphNode> = {}

  public static fromAdjacencyList(adjacencyList: GraphAdjacencyList): Graph {
    const resultGraph: Graph = new Graph()

    for (const key in adjacencyList) {
      if (!adjacencyList.hasOwnProperty(key)) {
        continue
      }

      if (!resultGraph.hasNode(key)) {
        resultGraph.addNode(key)
      }

      const currentNode = resultGraph.getNode(key)

      for (const childKey in adjacencyList[ key ]) {
        if (!resultGraph.hasNode(childKey)) {
          resultGraph.addNode(childKey)
        }

        currentNode.addAdj(childKey, adjacencyList[ key ][ childKey ])
      }
    }

    return resultGraph
  }

  public addNode(key: GraphNodeKey): void {
    this.nodes[ key ] = new GraphNode(key)
  }

  public getNode(key: GraphNodeKey): GraphNode | undefined {
    return this.nodes[ key ]
  }

  public getNodes(): readonly GraphNode[] {
    return Object.values(this.nodes)
  }

  public hasNode(key: GraphNodeKey): boolean {
    return key in this.nodes
  }

  public addEdge(nodeKey1: GraphNodeKey, nodeKey2: GraphNodeKey, weight: number = 0): void {
    if (!this.hasNode(nodeKey1)) {
      this.addNode(nodeKey1)
    }

    if (!this.hasNode(nodeKey2)) {
      this.addNode(nodeKey2)
    }

    this.getNode(nodeKey1).addAdj(nodeKey2, weight)
  }
}
