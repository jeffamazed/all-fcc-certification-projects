import numpy as np


def calculate(lst):
    if len(lst) < 9:
        raise ValueError("List must contain nine numbers.")

    arr = np.array(lst).reshape(3, 3)

    calculations = {
        "mean": [list(arr.mean(axis=0)), list(arr.mean(axis=1)), arr.mean().item()],
        "variance": [list(arr.var(axis=0)), list(arr.var(axis=1)), arr.var().item()],
        "standard deviation": [
            list(arr.std(axis=0)),
            list(arr.std(axis=1)),
            arr.std().item(),
        ],
        "max": [list(arr.max(axis=0)), list(arr.max(axis=1)), arr.max().item()],
        "min": [list(arr.min(axis=0)), list(arr.min(axis=1)), arr.min().item()],
        "sum": [list(arr.sum(axis=0)), list(arr.sum(axis=1)), arr.sum().item()],
    }

    return calculations
