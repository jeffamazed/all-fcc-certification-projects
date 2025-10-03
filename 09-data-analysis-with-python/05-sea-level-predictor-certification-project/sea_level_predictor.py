import pandas as pd
import matplotlib.pyplot as plt
from scipy.stats import linregress
import numpy as np


def draw_plot():
    # Read data from file
    df = pd.read_csv("./epa-sea-level.csv")

    x = df["Year"]
    y = df["CSIRO Adjusted Sea Level"]

    # Create scatter plot
    plt.scatter(
        x,
        y,
        color="#1f77b4",  # nicer blue
        s=20,  # larger size
        alpha=0.8,  # slight transparency
        marker="o",
        edgecolors="dodgerblue",
    )

    # Create first line of best fit
    slope_overall, intercept_overall, _, _, _ = linregress(x, y)
    x_line = np.linspace(x.min(), 2050, 171)
    y_fit = slope_overall * x_line + intercept_overall
    plt.plot(
        x_line,
        y_fit,
        color="red",
        linewidth=1,
        linestyle="-.",
    )

    # Create second line of best fit
    df_recent = df[df["Year"] >= 2000].copy()
    x_recent = df_recent["Year"]
    y_recent = df_recent["CSIRO Adjusted Sea Level"]

    slope_recent, intercept_recent, _, _, _ = linregress(x_recent, y_recent)
    x_recent_line = np.linspace(x_recent.min(), 2050, 51)
    y_recent_fit = slope_recent * x_recent_line + intercept_recent
    plt.plot(
        x_recent_line,
        y_recent_fit,
        color="green",
        linewidth=1,
        linestyle="--",
    )

    # Add labels and title
    plt.xlabel("Year")
    plt.ylabel("Sea Level (inches)")
    plt.title("Rise in Sea Level")

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig("sea_level_plot.png")
    return plt.gca()
