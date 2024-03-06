from abc import ABC


class Movement(ABC):
    """
    Движение
    """
    pass


class NoMovement(Movement):
    """
    Нет движения
    """
    pass


class ForwardMovement(Movement):
    """
    Движение вперед, к следующему экрану
    """

    def __init__(self, next_screen_code):
        self.next_screen_code = next_screen_code


class BackMovement(Movement):
    """
    Движение назад
    """
    pass


class ScreenNavigator:
    def __init__(self, screen_graph):
        self.screen_graph = screen_graph

    def navigate(self, now_screen_code: str, target_screen_code: str) -> Movement:
        """
        Осуществляет навигацию к указанном коду экрана

        :return движение, по которому нужно двигаться к целевому экрану
        """
        pass
