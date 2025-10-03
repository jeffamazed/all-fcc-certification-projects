# Forum Page Views Visualizer

This project is a **Forum Page Views Visualizer** built with **Python**.  
It analyzes daily page view data from the freeCodeCamp forum and provides visualizations to explore trends, seasonality, and distributions.

## Features

- Loads and processes the **forum page views dataset** (`fcc-forum-pageviews.csv`)  
- Cleans data by removing **outliers** (values outside the 2.5th–97.5th percentiles)  
- Generates visualizations:
  - **Line plot**: daily page views over time  
  - **Bar plot**: average monthly page views grouped by year  
  - **Box plots**:  
    - Year-wise box plot to show trends  
    - Month-wise box plot to show seasonality  
- Saves plots as `line_plot.png`, `bar_plot.png`, and `box_plot.png`  

## Tech Stack

- Python 3  
- Pandas for data manipulation  
- NumPy for numerical computations  
- Matplotlib and Seaborn for visualization  

## Credits

This project is part of the [freeCodeCamp Data Analysis with Python certification](https://www.freecodecamp.org/learn/data-analysis-with-python/).  
Dataset and project requirements provided by [freeCodeCamp](https://www.freecodecamp.org/).
