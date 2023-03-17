
export function round(x: number) {
    return Math.floor(x * 100) / 100
}

export function sum(data: number[]) {
    return data.reduce((prev, curr) => prev+curr, 0)
}

export function sumWithIndexFactor(data: number[]) {
    return data.map((e, i) => e * (i+1)).reduce((prev, curr) => prev+curr, 0)
}

export function getPartialSums(data: number[]) {
    return data.map((_, i, d) => sum(d.slice(0, i+1)))
}

export function getIncomeDistribution(partialSums: number[]) {
    const total = partialSums.at(-1) as number
    return partialSums.map(e => round(e/total))
}

export function getGroupDistribution(data: number[]) {
    return data.map((_, i) => round((i+1)/data.length))
}

export type GiniResult = {
    input: number[]
    partialSums: number[]
    total: number
    gini: number
    incomeDist: number[]
    groupDist: number[]
}

export default function CalculateGini(data: number[]) {
    const numerator = 2 * sumWithIndexFactor(data)
    const denominator = data.length * sum(data)

    const first = numerator / denominator
    const second = (data.length + 1) / data.length

    const g = round((first - second) * 100)
    const partialSums = getPartialSums(data)

    const result: GiniResult = {
        input: data,
        partialSums,
        total: partialSums.at(-1) as number,
        gini: g,
        incomeDist: getIncomeDistribution(partialSums),
        groupDist: getGroupDistribution(data),
    }

    return result
}