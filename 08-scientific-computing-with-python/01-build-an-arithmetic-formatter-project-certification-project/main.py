def arithmetic_arranger(problems, show_answers=False):
    if len(problems) > 5:
        return "Error: Too many problems."

    operators = {"+": lambda a, b: a + b, "-": lambda a, b: a - b}
    spaces_qty = 4
    spaces = spaces_qty * " "
    operation_result = 0

    first_line, second_line, third_line, fourth_line = [], [], [], []

    for problem in problems:
        components = problem.split(" ")
        op1, operator, op2 = components
        
        # check for invalids
        if operator not in operators:
            return "Error: Operator must be '+' or '-'."
        elif not op1.isdigit() or not op2.isdigit():
            return "Error: Numbers must only contain digits."
        elif len(op1) > 4 or len(op2) > 4:
            return "Error: Numbers cannot be more than four digits."
        else:
            max_len = max(len(op1), len(op2))
            width = max_len + 2
            
            first_line.append(op1.rjust(width))
            second_line.append(operator + " " + op2.rjust(max_len))
            third_line.append("-" * (width))
            
            # operation for show_answers
            if show_answers:
                result = operators[operator](int(op1), int(op2))
                fourth_line.append(str(result).rjust(width))
            
    result_1 = spaces.join(first_line)
    result_2 = spaces.join(second_line)
    result_3 = spaces.join(third_line)
    result_4 = spaces.join(fourth_line)

    arranged = f"{result_1}\n{result_2}\n{result_3}"
    
    if show_answers:
        arranged += f"\n{result_4}"  
    return arranged
        

print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"], True)}')
print(f'\n{arithmetic_arranger(["3801 - 2", "123 + 49"])}')

