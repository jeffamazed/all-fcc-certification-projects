class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __repr__(self):
        return f"{self.__class__.__name__}(width={self.width}, height={self.height})"

    def set_width(self, width):
        self.width = width
    
    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * self.width + 2 * self.height
    
    def get_diagonal(self):
        return (self.width ** 2 + self.height ** 2) ** 0.5

    def get_picture(self):
        if self.width > 50 or self.height > 50:
            return "Too big for picture."

        width_str = "*" * self.width
        new_line = "\n"
        return f"{new_line.join([width_str] * self.height)}\n"

    def get_amount_inside(self, another_shape):
        times_width = self.width // another_shape.width
        times_height = self.height // another_shape.height
        return times_width * times_height

class Square(Rectangle):
    def __init__(self, side_len):
        super().__init__(side_len, side_len)

    def __repr__(self):
        return f"{self.__class__.__name__}(side={self.width})"

    def set_side(self, side_len):
        self.width = side_len
        self.height = side_len

    def set_width(self, side_len):
        self.width = side_len
        self.height = side_len
    
    def set_height(self, side_len):
        self.width = side_len
        self.height = side_len


rect = Rectangle(10, 5)
print(rect.get_area())
rect.set_height(3)
print(rect.get_perimeter())
print(rect)
print(rect.get_picture())

sq = Square(9)
print(sq.get_area())
sq.set_side(4)
print(sq.get_diagonal())
print(sq)
print(sq.get_picture())

rect.set_height(8)
rect.set_width(16)
print(rect.get_amount_inside(sq))

