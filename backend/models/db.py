import os
from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime

class DatabaseManager:
    def __init__(self):
        self.client = None
        self.db = None

    def init_app(self, app):
        mongo_uri = app.config.get("MONGO_URI", "mongodb://localhost:27017/vanshos_db")
        try:
            # 5 seconds timeout for Atlas cloud connection
            self.client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
            self.client.admin.command('ping')
            db_name = mongo_uri.split("/")[-1].split("?")[0] or "vanshos_db"
            if db_name.startswith("?"):
                db_name = "vanshos_db"
            self.db = self.client[db_name]
            print(f"[*] MongoDB Atlas Connected Successfully to DB: {db_name}")
        except Exception as e:
            print(f"[*] MongoDB connection error ({e}). Operating in Mock Mode.")
            self.db = None
            self.client = None

    def get_collection(self, collection_name):
        if self.db is not None:
            return self.db[collection_name]
        return None

db_manager = DatabaseManager()

# Helper utilities for BSON ObjectId serialization
def serialize_doc(doc):
    if not doc:
        return None
    if isinstance(doc, list):
        return [serialize_doc(item) for item in doc]
    if isinstance(doc, dict):
        result = {}
        for k, v in doc.items():
            if k == "_id":
                result["id"] = str(v)
            elif isinstance(v, ObjectId):
                result[k] = str(v)
            elif isinstance(v, datetime.datetime):
                result[k] = v.isoformat()
            else:
                result[k] = v
        return result
    return doc

def to_object_id(id_str):
    try:
        return ObjectId(id_str)
    except Exception:
        return None
