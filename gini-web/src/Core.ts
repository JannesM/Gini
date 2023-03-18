
export type DataPoint = {
    name: string
    value: number
}

/**
 * Auf zwei Nachkommastellen runden.
 */
export function round(x: number) {
    return Math.floor(x * 100) / 100
}

/**
 * Addiert die Werte einer Liste.
 */
export function sum(data: number[], n?: number) {
    return data.reduce((prev, curr) => prev + curr, 0) + (n ?? 0)
}

/**
 * Addiert die Werte einer Liste mit einem aufsteigenden Faktor beginnend bei 1.
 */
export function sumWithIndexFactor(data: number[]) {
    return data.map((e, i) => e * (i + 1)).reduce((prev, curr) => prev + curr, 0)
}

/**
 * Bildet die Summe aus einem Wert und seinen vorläufern.
 */
export function getPartialSums(data: number[], n?: number) {
    return data.map((_, i, d) => sum(d.slice(0, i + 1), n))
}

/**
 * Erzeugt eine Lorenzkurve.
 */
export function lorenzCurve(data: DataPoint[]) {

    const partialSums = getPartialSums(data.map(e => e.value))
    const total = Math.max(...partialSums)

    const origin = { x: 0, y: 0 }
    const result = [origin]

    for (let i = 0; i < data.length; i++) {
        result.push({ x: round((1 / data.length) * (i + 1)), y: round(partialSums[i] / total) })
    }

    return result
}

/**
 * Ideale Verteilungskurve
 */
export function normal(data: DataPoint[]) {
    return Array.from({ length: data.length + 1 }, (_, i) => { return { x: round((1 / data.length) * i), y: round((1 / data.length) * i) } })
}

export type GiniResult = {
    input: DataPoint[]
    total: number
    gini: number
    scales: {
        lorenz: { x: number, y: number }[]
        normal: { x: number, y: number }[]
    }
}

export default function CalculateGini(data: DataPoint[]) {
    const sortedData = data.sort((a, b) => a.value - b.value) // sort by value (ascending)

    const values = sortedData.map(e => e.value)
    const n = sortedData.length

    const numerator = 2 * sumWithIndexFactor(values)
    const denominator = n * sum(values)

    const first = numerator / denominator
    const second = (n + 1) / n

    const g = round((first - second) * 100)

    const result: GiniResult = {
        input: data,
        total: Math.max(...getPartialSums(values)),
        gini: g,
        scales: {
            lorenz: lorenzCurve(sortedData),
            normal: normal(sortedData),
        }
    }

    console.log(result)

    return result
}