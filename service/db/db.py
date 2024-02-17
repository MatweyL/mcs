import json
import os


class JsonDb:
    def __init__(self, path):
        self.path = path

    def get_json(self):
        memory = {}
        if os.path.exists(self.path):
            with open(self.path, 'r+', encoding='utf-8') as json_file:
                memory = json.load(json_file)
        return memory

    def save_json(self, data):
        with open(self.path, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=2)
