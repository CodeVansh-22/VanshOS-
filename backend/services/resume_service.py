import datetime
from models.db import db_manager, serialize_doc

class ResumeService:
    @staticmethod
    def get_collection():
        return db_manager.get_collection("resume")

    @classmethod
    def get_info(cls):
        col = cls.get_collection()
        if col is None:
            return {
                "fileName": "Vansh_Sunil_Chauhan_Resume_2026.pdf",
                "filePath": "/uploads/resume/default_resume.pdf",
                "downloads": 142,
                "lastUpdated": datetime.datetime.now().isoformat()
            }
        doc = col.find_one({})
        if not doc:
            doc = {
                "fileName": "Vansh_Sunil_Chauhan_Resume_2026.pdf",
                "filePath": "/uploads/resume/default_resume.pdf",
                "downloads": 142,
                "lastUpdated": datetime.datetime.now(datetime.timezone.utc)
            }
            res = col.insert_one(doc)
            doc["_id"] = res.inserted_id
        return serialize_doc(doc)

    @classmethod
    def update_resume(cls, file_name, file_path):
        col = cls.get_collection()
        now = datetime.datetime.now(datetime.timezone.utc)
        if col is not None:
            col.update_one(
                {},
                {"$set": {"fileName": file_name, "filePath": file_path, "lastUpdated": now}},
                upsert=True
            )
        return cls.get_info()

    @classmethod
    def increment_download(cls):
        col = cls.get_collection()
        if col is not None:
            col.update_one({}, {"$inc": {"downloads": 1}}, upsert=True)
        info = cls.get_info()
        return info.get("downloads", 142)
