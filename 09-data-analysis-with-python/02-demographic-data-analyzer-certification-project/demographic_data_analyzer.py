import pandas as pd


def calculate_demographic_data(print_data=True):
    # Read data from file
    df = pd.read_csv("./adult.data.csv")

    # How many of each race are represented in this dataset? This should be a Pandas series with race names as the index labels.
    race_count = df["race"].value_counts()

    # What is the average age of men?
    average_age_men = round(df[df["sex"] == "Male"]["age"].mean(), 1)

    # What is the percentage of people who have a Bachelor's degree?
    percentage_bachelors = round(
        len(df[df["education"] == "Bachelors"]) / len(df) * 100, 1
    )

    # What percentage of people with advanced education (`Bachelors`, `Masters`, or `Doctorate`) make more than 50K?
    # What percentage of people without advanced education make more than 50K?

    # with and without `Bachelors`, `Masters`, or `Doctorate`

    higher_education = df["education"].isin(["Bachelors", "Masters", "Doctorate"])
    lower_education = ~df["education"].isin(["Bachelors", "Masters", "Doctorate"])

    higher_group = df[higher_education]
    lower_group = df[lower_education]

    # percentage with salary >50K
    higher_education_rich = round(
        (
            len(df[higher_education & (df["salary"] == ">50K")])
            / len(higher_group)
            * 100
        ),
        1,
    )
    lower_education_rich = round(
        (len(df[lower_education & (df["salary"] == ">50K")]) / len(lower_group) * 100),
        1,
    )

    # What is the minimum number of hours a person works per week (hours-per-week feature)?
    min_work_hours = df["hours-per-week"].min()

    # Filter people who work minimum hours
    min_workers = df[df["hours-per-week"] == min_work_hours]

    # Filter people who work minimum hours who earn >50K
    num_min_workers_rich = len(min_workers[min_workers["salary"] == ">50K"])
    # What percentage of the people who work the minimum number of hours per week have a salary of >50K?

    rich_percentage = (num_min_workers_rich / len(min_workers)) * 100

    # What country has the highest percentage of people that earn >50K?

    highest_earning_country_series = df.groupby("native-country")["salary"].apply(
        lambda x: (x == ">50K").mean() * 100
    )

    highest_earning_country = highest_earning_country_series.idxmax()
    highest_earning_country_percentage = round(highest_earning_country_series.max(), 1)

    # Identify the most popular occupation for those who earn >50K in India.
    top_IN_occupation = (
        df[(df["native-country"] == "India") & (df["salary"] == ">50K")]["occupation"]
        .value_counts()
        .idxmax()
    )

    # DO NOT MODIFY BELOW THIS LINE

    if print_data:
        print("Number of each race:\n", race_count)
        print("Average age of men:", average_age_men)
        print(f"Percentage with Bachelors degrees: {percentage_bachelors}%")
        print(
            f"Percentage with higher education that earn >50K: {higher_education_rich}%"
        )
        print(
            f"Percentage without higher education that earn >50K: {lower_education_rich}%"
        )
        print(f"Min work time: {min_work_hours} hours/week")
        print(
            f"Percentage of rich among those who work fewest hours: {rich_percentage}%"
        )
        print("Country with highest percentage of rich:", highest_earning_country)
        print(
            f"Highest percentage of rich people in country: {highest_earning_country_percentage}%"
        )
        print("Top occupations in India:", top_IN_occupation)

    return {
        "race_count": race_count,
        "average_age_men": average_age_men,
        "percentage_bachelors": percentage_bachelors,
        "higher_education_rich": higher_education_rich,
        "lower_education_rich": lower_education_rich,
        "min_work_hours": min_work_hours,
        "rich_percentage": rich_percentage,
        "highest_earning_country": highest_earning_country,
        "highest_earning_country_percentage": highest_earning_country_percentage,
        "top_IN_occupation": top_IN_occupation,
    }
