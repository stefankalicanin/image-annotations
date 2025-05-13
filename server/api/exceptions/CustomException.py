from uuid import UUID


class NotFoundException(Exception):
    def __init__(self, entity_name: str, entity_id: int | UUID):
        super().__init__(f"{entity_name} with id {entity_id} not found.")
        self.entity_name = entity_name
        self.entity_id = entity_id
