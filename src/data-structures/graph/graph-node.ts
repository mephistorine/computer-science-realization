export type GraphNodeKey = string | number

export class GraphNode {
  private connections: Record<GraphNodeKey, number> = {}

  constructor(public readonly key: GraphNodeKey) {
  }

  public addAdj(key: GraphNodeKey, weight: number): void {
    this.connections[ key ] = weight
  }

  public getConnections(): readonly string[] {
    return Object.keys(this.connections)
  }

  public getConnectionsWithWeight(): readonly [ GraphNodeKey, number ][] {
    return Object.entries(this.connections)
  }

  public getConnectionWeight(key: GraphNodeKey): number | undefined {
    return this.connections[ key ]
  }
}
