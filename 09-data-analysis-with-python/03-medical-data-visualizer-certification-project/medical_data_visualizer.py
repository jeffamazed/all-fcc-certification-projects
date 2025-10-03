import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1
df = pd.read_csv("./medical_examination.csv")

# 2
df["overweight"] = ((df["weight"] / ((df["height"] / 100) ** 2)) > 25).astype(int)

# 3
cat_cols = ["cholesterol", "gluc"]
df[cat_cols] = (df[cat_cols] > 1).astype(int)


# 4
def draw_cat_plot():
    cat_cols = ["cholesterol", "gluc", "smoke", "alco", "active", "overweight"]
    # 5
    df_cat = pd.melt(
        df,
        id_vars=["id", "cardio"],
        value_vars=cat_cols,
        var_name="variable",
        value_name="value",
    )

    df_cat_grouped = (
        df_cat.groupby(["cardio", "variable", "value"]).size().reset_index(name="total")
    )

    # 8
    fig = sns.catplot(
        data=df_cat_grouped,
        x="variable",
        y="total",
        hue="value",
        col="cardio",
        kind="bar",
    )

    fig = fig.figure

    # 9
    fig.savefig("catplot.png")
    return fig


# 10
def draw_heat_map():
    # 11
    df_heat = df[
        (df["ap_lo"] <= df["ap_hi"])
        & (
            df["height"].between(
                df["height"].quantile(0.025), df["height"].quantile(0.975)
            )
        )
        & (
            df["weight"].between(
                df["weight"].quantile(0.025), df["weight"].quantile(0.975)
            )
        )
    ]

    # 12
    corr = df_heat.corr()

    # 13
    mask = np.triu(np.ones_like(corr, dtype=bool))

    # 14
    fig, ax = plt.subplots(figsize=(10, 9))

    # 15
    sns.heatmap(
        corr,
        mask=mask,
        annot=True,
        fmt=".1f",
        cmap="magma",
        linewidth=0.5,
        ax=ax,
        cbar_kws={"shrink": 0.5},
    )

    # 16
    fig.savefig("heatmap.png")
    return fig
