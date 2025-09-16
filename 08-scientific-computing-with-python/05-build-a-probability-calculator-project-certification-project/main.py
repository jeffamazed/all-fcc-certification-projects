import copy
import random

class Hat:
    def __init__(self, **balls):
        self.contents = [ball for ball, qty in balls.items() for _ in range(qty)]
        
    def draw(self, n_balls_to_draw):
        # return all balls if exceeds
        total_balls = len(self.contents)
        if n_balls_to_draw > total_balls:
            contents_copy = copy.copy(self.contents)
            self.contents = []
            return contents_copy

        balls_drawn = []
        for n in range(n_balls_to_draw):
            remaining_balls = len(self.contents)
            rand = random.randint(0, remaining_balls - 1)
            balls_drawn.append(self.contents.pop(rand))
        
        return balls_drawn


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success = 0

    for _ in range(num_experiments):
        # deep copy instead of using shallow copy
        hat_copy = copy.deepcopy(hat)
        balls_drawn = hat_copy.draw(num_balls_drawn)

        # count all drawn balls
        drawn_counts = {}
        for ball in balls_drawn:
            drawn_counts[ball] = drawn_counts.get(ball, 0) + 1
        
        # check if expected_balls are in drawn balls
        is_included = True
        for ball, count in expected_balls.items():
            if drawn_counts.get(ball, 0) < count:
                is_included = False
                break
        
        if is_included:
            success += 1


    print(success/num_experiments)
    return success / num_experiments

hat = Hat(black=6, red=4, green=3)
probability = experiment(hat=hat,
                  expected_balls={'red':2,'green':1},
                  num_balls_drawn=5,
                  num_experiments=2000)