import test from "ava"
import { GraphNode } from "./graph-node"

test("should create graph node", (t) => {
  const node = new GraphNode("A")

  t.true(node instanceof GraphNode)
  t.is(node.key, "A")
})

test("should add connection", (t) => {
  const node = new GraphNode("A")

  node.addAdj("B", 0)

  t.true(node.getConnections().includes("B"))
})

test("should has weight", (t) => {
  const node = new GraphNode("A")

  node.addAdj("B", 10)

  t.is(node.getConnectionWeight("B"), 10)
})
