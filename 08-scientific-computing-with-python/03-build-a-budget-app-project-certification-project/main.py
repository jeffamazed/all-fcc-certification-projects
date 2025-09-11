class Category:
    def __init__(self, cat_name):
        self.cat_name = cat_name
        self.ledger = []

    def __str__(self):
        title_len = 30
        result_str = ""
        result_str += self.cat_name.center(title_len, "*")

        for item in self.ledger:
            description = item['description'][:23].ljust(23, " ")
            formatted_amount = f"{item['amount']:.2f}"
            amount = formatted_amount.rjust(7, " ")
            result_str += f"\n{description}{amount}"       
        # total
        result_str += f"\nTotal: {self.get_balance():.2f}"
        
        return result_str


    def deposit(self, amount, description = ""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description = ""):
        if amount > self.get_balance():
            return False
        else:
            self.ledger.append({"amount": -amount, "description": description})
            return True
    
    def get_balance(self):
        balance = sum(item["amount"] for item in self.ledger)
        return balance

    def transfer(self, amount, dest_cat):
        if amount > self.get_balance():
            return False
        else:
            self.ledger.append({"amount": -amount, "description": f"Transfer to {dest_cat.cat_name}"})
            dest_cat.ledger.append({"amount": amount, "description": f"Transfer from {self.cat_name}"})
            return True

    def check_funds(self, amount):
        return True if self.get_balance() >= amount else False

def floored(n):
    return int((n // 10) * 10)

def create_spend_chart(categories):
    # header
    result_str = "Percentage spent by category"
    
    total_spend = sum(
        abs(sum(item["amount"] for item in cat.ledger if item["amount"] < 0))
        for cat in categories
    )

    for pct in range(100, -1, -10):
        result_str += f"\n{str(pct).rjust(3, ' ')}|"

        for cat in categories:
            spend = abs(sum(item["amount" ]for item in cat.ledger if item["amount"] < 0))
            spend_pct = floored((spend / total_spend) * 100) 
            
            if spend_pct >= pct:
                result_str += " o "
            else:
                result_str += "   "
        result_str += " "
        
    # add spacer
    result_str += "\n    " + "-" * (3 * len(categories) + 1) + "\n"

    # caterogy names vertically
    longest_len = max(len(cat.cat_name) for cat in categories)
    
    for i in range(longest_len):
        result_str += "     "

        for cat in categories:
            name = cat.cat_name
            if i < len(name):
                result_str += name[i] + "  "
            else:
                result_str += "   "
        
        if i != longest_len - 1:
            result_str += "\n"
    return result_str

food = Category('Food')
food.deposit(1000, 'deposit')
food.withdraw(10.15, 'groceries')
food.withdraw(15.89, 'restaurant and more food for dessert')
clothing = Category('Clothing')
clothing.deposit(500, "deposit")
clothing.withdraw(50, "shoes")
clothing.withdraw(50, "manicure")
food.transfer(50, clothing)

print(create_spend_chart([food, clothing]))