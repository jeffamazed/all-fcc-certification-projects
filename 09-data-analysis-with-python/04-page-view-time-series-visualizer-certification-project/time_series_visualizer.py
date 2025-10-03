import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import numpy as np
import calendar


# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv("./fcc-forum-pageviews.csv", parse_dates=["date"], index_col="date")

# Clean data
quantiles = df["value"].quantile([0.025, 0.975])
q_low = quantiles[0.025]
q_high = quantiles[0.975]

df = df[df["value"].between(q_low, q_high)]


def draw_line_plot():
    # Draw line plot
    fig, ax = plt.subplots(figsize=(16, 5.5))

    ax.plot(df.index, df["value"], color="blue")
    ax.set_title("Daily freeCodeCamp Forum Page Views 5/2016-12/2019", fontsize=16)
    ax.set_ylabel("Page Views", fontsize=12)
    ax.set_xlabel("Date", fontsize=12)

    # Save image and return fig (don't change this part)
    fig.savefig("line_plot.png")
    return fig


def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy()
    monthly = (
        df_bar["value"]
        .groupby([df_bar.index.year, df_bar.index.month])
        .mean()
        .unstack(
            level=1  # use unstack level 1 go make columns for each month in a year
        )
    )

    # Draw bar plot
    fig, ax = plt.subplots(figsize=(10, 8))

    n_years = len(monthly.index)
    n_months = len(monthly.columns)
    width = 0.05  # width of each month bar
    x = np.arange(n_years)  # positions for each year

    for i, month in enumerate(monthly.columns):
        offset = i * width
        ax.bar(
            x + offset, monthly[month], width=width, label=calendar.month_name[month]
        )

    # Set x-ticks at the center of each year group
    ax.set_xticks(x + width * (n_months - 1) / 2)
    ax.set_xticklabels(monthly.index)
    ax.set_xlabel("Years", fontsize=13)
    ax.set_ylabel("Average Page Views", fontsize=13)
    ax.set_ylim(0, 160_000)
    ax.legend(title="Months", loc="upper left")

    # Save image and return fig (don't change this part)
    fig.savefig("bar_plot.png")
    return fig


def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box["year"] = df_box["date"].dt.year
    df_box["month"] = df_box["date"].dt.strftime("%b")

    month_order_abbr = list(calendar.month_abbr[1:])
    print(df_box)
    sns.set_theme(style="ticks")

    # Draw box plots (using Seaborn)
    fig, axes = plt.subplots(1, 2, figsize=(18, 8))
    sns.boxplot(
        x="year",
        y="value",
        data=df_box,
        ax=axes[0],
        color="skyblue",
        orient="vertical",
        width=0.6,
    )
    axes[0].set_title("Year-wise Box Plot (Trend)")
    axes[0].set_ylabel("Page Views")
    axes[0].set_xlabel("Year")

    sns.boxplot(
        x="month",
        y="value",
        data=df_box,
        ax=axes[1],
        order=month_order_abbr,
        color="lightgreen",
        orient="vertical",
        width=0.6,
    )
    axes[1].set_title("Month-wise Box Plot (Seasonality)")
    axes[1].set_ylabel("Page Views")
    axes[1].set_xlabel("Month")

    # Save image and return fig (don't change this part)
    fig.savefig("box_plot.png")
    return fig
