import { Graph, GraphNodeKey } from "../../data-structures"

export function dijkstra(graph: Graph, startNodeKey: GraphNodeKey): Record<GraphNodeKey, number> {
  const distances: Record<GraphNodeKey, number> = graph.getNodes().reduce((distances, current) => {
    distances[ current.key ] = Infinity
    return distances
  }, {})

  distances[ startNodeKey ] = 0

  const pq: [ number, GraphNodeKey ][] = [
    [ 0, startNodeKey ]
  ]

  while (pq.length > 0) {
    const [ currentDistance, currentNodeKey ] = pq.pop()

    if (currentDistance > distances[ currentNodeKey ]) {
      continue
    }

    for (const [ neighborNodeKey, weight ] of graph.getNode(currentNodeKey).getConnectionsWithWeight()) {
      const distance: number = currentDistance + weight

      if (distance < distances[ neighborNodeKey ]) {
        distances[ neighborNodeKey ] = distance
        pq.push([ distance, neighborNodeKey ])
      }
    }
  }

  return distances
}
