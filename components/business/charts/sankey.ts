import type { EChartsOption } from "echarts"

export type SankeyDataRecord = Record<string, unknown>

export interface SankeyNode {
  name: string
  depth?: number
  itemStyle?: { color?: string; borderColor?: string }
}

export interface SankeyLink {
  source: string
  target: string
  value: number
}

export interface SankeyOption {
  nodes: SankeyNode[]
  links: SankeyLink[]
  columns: string[][]
}

function toStringValue(v: unknown): string {
  return v == null ? "" : String(v)
}

function toNumberValue(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v
  if (typeof v === "string") {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
  }
  return 0
}

export function buildSankeyLayout(
  data: SankeyDataRecord[],
  xKey: string,
  yKey: string,
  valueKey: string,
): { nodes: SankeyNode[]; links: SankeyLink[]; columns: string[][] } {
  const outgoing = new Map<string, Set<string>>()
  const incoming = new Map<string, Set<string>>()
  const nodeOrder: string[] = []
  const seen = new Set<string>()

  const ensure = (name: string) => {
    if (!seen.has(name)) {
      seen.add(name)
      nodeOrder.push(name)
      outgoing.set(name, new Set())
      incoming.set(name, new Set())
    }
  }

  const links: SankeyLink[] = []
  for (const row of data) {
    const source = toStringValue(row[xKey])
    const target = toStringValue(row[yKey])
    if (!source || !target) continue
    ensure(source)
    ensure(target)
    outgoing.get(source)!.add(target)
    incoming.get(target)!.add(source)
  }

  const depth = new Map<string, number>()
  const placed = new Set<string>()
  for (const name of nodeOrder) {
    if (incoming.get(name)!.size === 0) {
      depth.set(name, 0)
      placed.add(name)
    }
  }

  let safety = nodeOrder.length * nodeOrder.length + 1
  while (placed.size < nodeOrder.length && safety-- > 0) {
    let changed = false
    for (const name of nodeOrder) {
      if (placed.has(name)) continue
      const ins = incoming.get(name)!
      let maxSrcDepth = -1
      let allSrcPlaced = true
      for (const src of ins) {
        if (!placed.has(src)) {
          allSrcPlaced = false
          break
        }
        const sd = depth.get(src) ?? 0
        if (sd > maxSrcDepth) maxSrcDepth = sd
      }
      if (allSrcPlaced) {
        depth.set(name, maxSrcDepth + 1)
        placed.add(name)
        changed = true
      }
    }
    if (!changed) {
      for (const name of nodeOrder) {
        if (!placed.has(name)) {
          depth.set(name, 0)
          placed.add(name)
        }
      }
      break
    }
  }

  const maxDepth = Math.max(0, ...Array.from(depth.values()))
  const columns: string[][] = Array.from({ length: maxDepth + 1 }, () => [])
  for (const [name, d] of depth) columns[d].push(name)

  for (const row of data) {
    const source = toStringValue(row[xKey])
    const target = toStringValue(row[yKey])
    if (!source || !target) continue
    links.push({ source, target, value: toNumberValue(row[valueKey]) })
  }

  const nodes: SankeyNode[] = nodeOrder.map((name) => ({ name, depth: depth.get(name) ?? 0 }))

  return { nodes, links, columns }
}

export interface BuildSankeyOptionInput {
  data: SankeyDataRecord[]
  xKey: string
  yKey: string
  valueKey: string
  palette: string[]
  height: number
}

export function buildSankeyOption(input: BuildSankeyOptionInput): EChartsOption
export function buildSankeyOption(
  data: SankeyDataRecord[],
  xKey: string,
  yKey: string,
  valueKey: string,
  palette: string[],
  height: number,
): EChartsOption
export function buildSankeyOption(
  dataOrInput: SankeyDataRecord[] | BuildSankeyOptionInput,
  xKey?: string,
  yKey?: string,
  valueKey?: string,
  palette?: string[],
  height?: number,
): EChartsOption {
  const data: SankeyDataRecord[] = Array.isArray(dataOrInput)
    ? dataOrInput
    : (dataOrInput.data ?? [])
  const sourceKey = xKey ?? (dataOrInput as BuildSankeyOptionInput).xKey
  const targetKey = yKey ?? (dataOrInput as BuildSankeyOptionInput).yKey
  const valueK = valueKey ?? (dataOrInput as BuildSankeyOptionInput).valueKey
  const pal = palette ?? (dataOrInput as BuildSankeyOptionInput).palette
  const h = height ?? (dataOrInput as BuildSankeyOptionInput).height

  const layout = buildSankeyLayout(data, sourceKey, targetKey, valueK)
  const links: SankeyLink[] = layout.links.map((l) => ({ ...l }))

  const nodes: SankeyNode[] = layout.nodes.map((n, i) => ({
    ...n,
    itemStyle: { color: pal[i % pal.length], borderColor: pal[i % pal.length] },
  }))

  return {
    series: [
      {
        type: "sankey",
        height: h,
        nodeWidth: 18,
        nodeGap: 14,
        nodeAlign: "justify",
        layoutIterations: 64,
        emphasis: { focus: "adjacency" },
        data: nodes,
        links,
        lineStyle: {
          color: "gradient",
          opacity: 0.55,
          curveness: 0.5,
        },
        label: {
          color: "currentColor",
          fontFamily: "inherit",
        },
        itemStyle: {
          borderWidth: 0,
        },
      },
    ],
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
  }
}
