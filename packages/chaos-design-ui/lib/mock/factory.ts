import { getFaker, seedFaker } from "./seed"

export type Factory<T> = (overrides?: Partial<T>) => T

export function defineFactory<T>(builder: (faker: ReturnType<typeof getFaker>, index: number) => T): Factory<T> {
  let counter = 0
  return (overrides) => {
    const f = getFaker()
    return { ...builder(f, counter++), ...overrides }
  }
}

export function many<T>(factory: Factory<T>, count: number, seed?: number): T[] {
  if (seed !== undefined) seedFaker(seed)
  return Array.from({ length: count }, () => factory())
}

export const userFactory = defineFactory<{
  id: string
  name: string
  email: string
  avatar: string
  role: "admin" | "manager" | "editor" | "viewer"
  createdAt: string
}>((f) => ({
  id: f.string.uuid(),
  name: f.person.fullName(),
  email: f.internet.email().toLowerCase(),
  avatar: f.image.avatarGitHub(),
  role: f.helpers.arrayElement(["admin", "manager", "editor", "viewer"]) as "admin" | "manager" | "editor" | "viewer",
  createdAt: f.date.past({ years: 1 }).toISOString(),
}))

export const orderFactory = defineFactory<{
  id: string
  number: string
  customer: string
  amount: number
  status: "draft" | "pending" | "approved" | "rejected" | "completed"
  createdAt: string
}>((f) => ({
  id: f.string.uuid(),
  number: `ORD-${f.string.alphanumeric({ length: 8, casing: "upper" })}`,
  customer: f.person.fullName(),
  amount: Number(f.commerce.price({ min: 100, max: 50000 })),
  status: f.helpers.arrayElement(["draft", "pending", "approved", "rejected", "completed"]) as "draft" | "pending" | "approved" | "rejected" | "completed",
  createdAt: f.date.recent({ days: 30 }).toISOString(),
}))

export const metricFactory = defineFactory<{
  date: string
  value: number
  label?: string
}>((f) => ({
  date: f.date.recent({ days: 30 }).toISOString().slice(0, 10),
  value: f.number.int({ min: 0, max: 10000 }),
  label: f.commerce.productAdjective(),
}))

export const notificationFactory = defineFactory<{
  id: string
  title: string
  description: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
}>((f) => ({
  id: f.string.uuid(),
  title: f.commerce.productName(),
  description: f.commerce.productDescription(),
  type: f.helpers.arrayElement(["info", "success", "warning", "error"]) as "info" | "success" | "warning" | "error",
  timestamp: f.date.recent({ days: 7 }).toISOString(),
  read: f.datatype.boolean(),
}))

export const chartSeriesFactory = defineFactory<{
  name: string
  data: Array<{ x: number; y: number }>
}>((f) => ({
  name: f.commerce.productName(),
  data: Array.from({ length: 12 }, (_, i) => ({
    x: i,
    y: f.number.int({ min: 0, max: 1000 }),
  })),
}))
