export function loadFixture<T>(data: T): T {
  return data
}

export function cloneFixture<T>(data: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(data)
  }
  return JSON.parse(JSON.stringify(data)) as T
}
