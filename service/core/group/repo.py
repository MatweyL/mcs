from abc import abstractmethod


class GroupRepo:
    @abstractmethod
    def get_groups(self):
        pass

    @abstractmethod
    def get_users_in_group(self, group_id: str):
        pass
