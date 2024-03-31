import pprint
from queue import Queue
from typing import Set

from service.common.screen_navigator import ScreenNavigator, Movement, ForwardMovement, BackMovement, NoMovement


class ScreenNavigatorImpl(ScreenNavigator):

    def navigate(self, now_screen_code: str, target_screen_code: str) -> Movement:
        if now_screen_code == target_screen_code:
            return NoMovement()
        paths = bfs(self.screen_graph, target_screen_code)

        next_screen_code = paths[now_screen_code]
        now_screen_child = get_node_child(self.screen_graph, now_screen_code)
        if next_screen_code not in now_screen_child:
            return BackMovement()
        return ForwardMovement(next_screen_code)


def get_node_parents(graph: dict, node: str) -> Set[str]:
    node_parents = set()
    for parent, child in graph.items():
        if node in child:
            node_parents.add(parent)
    return node_parents


def get_node_child(graph: dict, node: str) -> Set[str]:
    return set(graph.get(node, []))


def bfs(graph: dict, start: str, ) -> dict:
    """

    :param graph: Граф смежностей
    :param start: Вершина, с которой мы начинаем поиск в ширину
    :return: пути до всех вершин графа

    Граф
    a: b, c
    c: d, g
    g: v

    Нужно найти путь из b к g:
    b -> g: b-a-c-g

    start = 'b'
    target = 'g'
    paths = bfs(g, target)
    output: {'a': 'c', 'b': 'a', 'c': 'g', 'd': 'c', 'v': 'g'}

    """
    to_visit_nodes = Queue()
    visited_nodes = set()

    to_visit_nodes.put(start)
    visited_nodes.add(start)

    paths = {}

    while not to_visit_nodes.empty():
        node = to_visit_nodes.get()
        node_parents = get_node_parents(graph, node)
        node_child = get_node_child(graph, node)
        neighbor_nodes = [*node_parents, *node_child]

        for neighbor_node in neighbor_nodes:
            if neighbor_node not in visited_nodes:
                visited_nodes.add(neighbor_node)
                to_visit_nodes.put(neighbor_node)
                paths[neighbor_node] = node
    return paths


if __name__ == '__main__':
    g = {'a': ['b', 'c'], 'b': [], 'c': ['d', 'g'], 'd': [], 'g': ['v'], 'v': []}
    start = 'b'
    target = 'g'
    paths = bfs(g, target)
    pprint.pprint(paths)
    if paths[start] in get_node_child(g, start):
        ...  # вперед
    else:
        ...  # назад
