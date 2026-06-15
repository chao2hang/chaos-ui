import { faker, Faker, en, zh_CN, base } from "@faker-js/faker"

const seededFakers = new Map<string, Faker>()

export function getFaker(locale: "en" | "zh_CN" = "zh_CN"): Faker {
  if (!seededFakers.has(locale)) {
    const f = new Faker({ locale: [locale === "zh_CN" ? zh_CN : en, base] })
    seededFakers.set(locale, f)
  }
  return seededFakers.get(locale)!
}

export function seedFaker(seed: number, locale: "en" | "zh_CN" = "zh_CN"): Faker {
  const f = getFaker(locale)
  f.seed(seed)
  return f
}

export { faker }
