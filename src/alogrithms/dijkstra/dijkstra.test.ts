import test from "ava"
import { Graph, GraphAdjacencyList } from "../../data-structures"
import { dijkstra } from "./dijkstra"

test("should calc", (t) => {
  const adjacencyList: GraphAdjacencyList = {
    "A": {
      "B": 2,
      "C": 6
    },
    "B": {
      "D": 5
    },
    "C": {
      "D": 8
    },
    "D": {}
  }

  const graph: Graph = Graph.fromAdjacencyList(adjacencyList)

  const result = dijkstra(graph, "A")

  t.deepEqual(result, {
    A: 0,
    B: 2,
    C: 6,
    D: 7
  })
})
