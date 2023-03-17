import math


def round_n(num: int):
    return math.ceil(num * 1000) / 1000

def sum_with_index_factor(data: list[int]):
    
    sum = 0
    for i, e in enumerate(data):
        sum += ((i+1) * e)

    return sum


def partial_sums(data: list[int]):
    result = list()

    for i in range(len(data)):
        result.append(sum(data[:i+1]))

    return result

def income_distribution(partial_sums: list[int]):
    result = list()
    total = partial_sums[-1]

    for e in partial_sums:
        result.append(round_n(e/total))

    return result

def group_distribution(data: list[int]):
    result = list()
    total = len(data)

    for i in range(total):
        result.append(round_n((i+1)/total))

    return result

def calc_gini(data: list[int]):

    numerator = 2 * sum_with_index_factor(data)
    denominator = len(data) * sum(data)

    first = numerator / denominator
    second = (len(data) + 1) / len(data)
    
    g = first - second
    parrtial_sums = partial_sums(data)

    result = {
        "raw": data,
        "partial_sums": parrtial_sums,
        "total": parrtial_sums[-1],
        "income_distribution": income_distribution(parrtial_sums),
        "group_distribution": group_distribution(data),
    }

    return result

if __name__ == "__main__":

    data = [2, 4, 5, 5, 20]
    gini = calc_gini(data)

    print(gini)


