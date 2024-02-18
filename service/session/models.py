class Channel:
    def __init__(self):
        self.uid = None
        self.mode = None

    def to_json(self):
        return self.__dict__


class Session:
    def __init__(self):
        self.uid = None
        self.title = None
        self.date = None
        self.user_uid = None
        self.channels = []

    def to_json(self):
        return self.__dict__
