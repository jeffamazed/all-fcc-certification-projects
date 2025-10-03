# Medical Data Visualizer

This project is a **Medical Data Visualizer** built with **Python**.  
It analyzes a dataset containing medical records and visualizes key features and relationships through categorical and correlation plots.

## Features

- Loads and processes the **medical dataset** (`medical_data.csv`)  
- Performs **data cleaning** including:
  - Removing incorrect blood pressure measurements (`ap_lo > ap_hi`)  
  - Filtering out height and weight outliers (outside 2.5th–97.5th percentiles)  
- Computes additional features:
  - **Overweight** indicator based on BMI  
  - Normalization of **cholesterol** and **glucose** levels  
- Generates visualizations:
  - **Categorical plot**: counts of categorical variables split by cardiovascular disease status  
  - **Heatmap**: correlation matrix of numeric features with a mask for the upper triangle  
- Saves plots as `catplot.png` and `heatmap.png`  

## Tech Stack

- Python 3  
- Pandas for data manipulation  
- NumPy for numerical computations  
- Seaborn and Matplotlib for visualization  

## Credits

This project is part of the [freeCodeCamp Data Analysis with Python certification](https://www.freecodecamp.org/learn/data-analysis-with-python/).  
Dataset and project requirements provided by [freeCodeCamp](https://www.freecodecamp.org/).
