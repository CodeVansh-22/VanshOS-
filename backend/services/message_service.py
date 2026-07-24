import datetime
from models.db import db_manager, serialize_doc, to_object_id

class MessageService:
    @staticmethod
    def get_collection():
        return db_manager.get_collection("messages")

    @classmethod
    def create(cls, data):
        col = cls.get_collection()
        now = datetime.datetime.now(datetime.timezone.utc)
        doc = {
            "name": data.get("name"),
            "email": data.get("email"),
            "subject": data.get("subject", "General Inquiry"),
            "message": data.get("message"),
            "status": "unread",
            "createdAt": now
        }
        if col is not None:
            res = col.insert_one(doc)
            doc["_id"] = res.inserted_id
        else:
            doc["_id"] = "mock_msg_id"
        return serialize_doc(doc)

    @classmethod
    def get_all(cls):
        col = cls.get_collection()
        if col is None:
            return [
                {
                    "id": "1",
                    "name": "Alexander Vance",
                    "email": "alexander@techcorp.io",
                    "subject": "Data Analytics Senior Role Inquiry",
                    "message": "Hello Vansh, I reviewed your BCA credentials and portfolio design. Let us connect soon.",
                    "status": "unread",
                    "createdAt": datetime.datetime.now().isoformat()
                }
            ]
        messages = list(col.find().sort("createdAt", -1))
        return serialize_doc(messages)

    @classmethod
    def update_status(cls, message_id, status):
        col = cls.get_collection()
        if col is None:
            return True
        obj_id = to_object_id(message_id)
        if not obj_id:
            return False
        col.update_one({"_id": obj_id}, {"$set": {"status": status}})
        return True

    @classmethod
    def delete(cls, message_id):
        col = cls.get_collection()
        if col is None:
            return True
        obj_id = to_object_id(message_id)
        if not obj_id:
            return False
        res = col.delete_one({"_id": obj_id})
        return res.deleted_count > 0
