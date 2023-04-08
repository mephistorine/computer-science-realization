import test from "ava"
import { Graph, GraphAdjacencyList } from "./graph"

test("should add node", t => {
  const graph = new Graph()

  graph.addNode("Hello")

  t.true(graph.hasNode("Hello"))
})

test("should get node", t => {
  const graph = new Graph()
  const key = "Hello"
  graph.addNode(key)

  const result = graph.getNode(key)

  t.is(result.key, key)
})

test("should add edge between two nodes", t => {
  const graph = new Graph()
  graph.addNode("A")
  graph.addNode("B")
  graph.addEdge("A", "B")

  const nodeA = graph.getNode("A")

  t.true(nodeA.getConnections().includes("B"))
})

test("should create graph from adjacency list", (t) => {
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

  const result: Graph = Graph.fromAdjacencyList(adjacencyList)

  t.true(result.hasNode("A"))
  t.true(result.hasNode("B"))
  t.true(result.hasNode("C"))
  t.true(result.hasNode("D"))

  t.is(result.getNode("A").getConnectionWeight("B"), 2)
  t.is(result.getNode("A").getConnectionWeight("C"), 6)

  t.is(result.getNode("B").getConnectionWeight("D"), 5)

  t.is(result.getNode("C").getConnectionWeight("D"), 8)

  t.is(result.getNode("D").getConnections().length, 0)
})
