# Sea Level Predictor

This project is a **Sea Level Predictor** built with **Python**.  
It analyzes historical sea level data and provides visualizations with lines of best fit to predict future sea level rise.

## Features

- Loads and processes the **sea level dataset** (`epa-sea-level.csv`)  
- Generates visualizations:
  - **Scatter plot**: historical sea levels over time  
  - **Line of best fit (overall)**: predicts sea level rise through 2050  
  - **Line of best fit (recent data since 2000)**: predicts future rise based on recent trends  
- Adds plot labels and title:
  - X-axis: `Year`  
  - Y-axis: `Sea Level (inches)`  
  - Title: `Rise in Sea Level`  
- Saves the plot as `sea_level_plot.png`  

## Tech Stack

- Python 3  
- Pandas for data manipulation  
- NumPy for numerical computations  
- Matplotlib and SciPy for visualization and linear regression  

## Credits

This project is part of the [freeCodeCamp Data Analysis with Python certification](https://www.freecodecamp.org/learn/data-analysis-with-python/).  
Dataset and project requirements provided by [freeCodeCamp](https://www.freecodecamp.org/).
