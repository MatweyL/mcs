from dataclasses import dataclass
from typing import Dict

import uvicorn as uvicorn
from fastapi import FastAPI


@dataclass
class Attribute:
    name: str


@dataclass
class Screen:
    name: str  # alias - screen
    attributes: Dict[str, Attribute]

    def get(self, attribute_name):
        attribute = self.attributes[attribute_name]
        return attribute


class ScreenParser:

    def __init__(self, domain_object):
        self.domain_object = domain_object

    def parse(self, screen: Screen):
        pass


class ScreenBuilder:

    def __init__(self):
        pass


app = FastAPI()


def main():
    pass


if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)
