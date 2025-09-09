def add_time(start, duration, day = ""):
    days = ["monday", "tuesday", "wednesday", "thursday",
        "friday", "saturday", "sunday"]
    MINUTES_IN_A_DAY = 24 * 60
    
    time_part, meridiem = start.split()
    hours, minutes = time_part.split(":")
    hours = int(hours)
    minutes = int(minutes)

    if meridiem == "AM":
        if hours == 12:
            minutes = minutes
        else:
            minutes = hours * 60 + minutes
    elif meridiem == "PM":
        if hours == 12:
            minutes = 12 * 60 + minutes
        else:
            minutes = (hours + 12) * 60 + minutes

    duration_hours, duration_minutes = duration.split(":")
    minutes_to_add = int(duration_hours) * 60 + int(duration_minutes)
    
    total_minutes = minutes + minutes_to_add
    days_passed = total_minutes // MINUTES_IN_A_DAY
    current_minutes = total_minutes % MINUTES_IN_A_DAY

    hours_calculated = current_minutes // 60
    minutes_calculated = current_minutes % 60

    hours_result = None
    minutes_result = str(minutes_calculated).rjust(2, "0")
    
    if hours_calculated == 0:
        hours_result = "12"
        meridiem = "AM"
    elif hours_calculated < 12:
        hours_result = str(hours_calculated)
        meridiem = "AM"
    elif hours_calculated == 12:
        hours_result = "12"
        meridiem = "PM"
    else:
        hours_result = str(hours_calculated % 12)
        meridiem = "PM"


    result = f"{hours_result}:{minutes_result} {meridiem}"

    if day:
        day_index = days.index(day.lower())
        result += f", {days[(day_index + days_passed) % 7].capitalize()}"

    if days_passed == 1:
        result += " (next day)"
    elif days_passed > 1:
        result += f" ({days_passed} days later)"
    return result

    
print(add_time('11:59 PM', '24:05'))

