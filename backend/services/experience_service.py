import datetime
from models.db import db_manager, serialize_doc, to_object_id

class ExperienceService:
    @staticmethod
    def get_collection():
        return db_manager.get_collection("experiences")

    @classmethod
    def get_all(cls):
        col = cls.get_collection()
        initial_experience = [
            {
                "id": "1",
                "title": "AI Web Developer Intern",
                "company": "InAmigos Foundation",
                "employmentType": "Internship",
                "status": "Present",
                "startDate": "2024",
                "endDate": "Present",
                "currentlyWorking": True,
                "location": "Remote",
                "description": [
                    "Developing responsive web applications.",
                    "Working with AI-assisted development tools.",
                    "Building modern user interfaces.",
                    "Collaborating with team members on real-world projects."
                ],
                "displayOrder": 1,
                "createdAt": datetime.datetime.now(datetime.timezone.utc).isoformat()
            }
        ]

        if col is None:
            return initial_experience

        experiences = list(col.find().sort("displayOrder", 1))
        if not experiences:
            # Seed initial experience record into MongoDB Atlas if empty
            col.insert_one(initial_experience[0])
            experiences = list(col.find().sort("displayOrder", 1))

        return serialize_doc(experiences)

    @classmethod
    def get_by_id(cls, exp_id):
        col = cls.get_collection()
        if col is None:
            return None
        obj_id = to_object_id(exp_id)
        if not obj_id:
            return None
        doc = col.find_one({"_id": obj_id})
        return serialize_doc(doc)

    @classmethod
    def create(cls, data):
        col = cls.get_collection()
        now = datetime.datetime.now(datetime.timezone.utc)

        description = data.get("description", [])
        if isinstance(description, str):
            description = [d.strip() for d in description.split("\n") if d.strip()]

        doc = {
            "title": data.get("title", ""),
            "company": data.get("company", ""),
            "employmentType": data.get("employmentType", "Internship"),
            "status": data.get("status", "Present"),
            "startDate": data.get("startDate", ""),
            "endDate": data.get("endDate", "Present"),
            "currentlyWorking": bool(data.get("currentlyWorking", True)),
            "location": data.get("location", "Remote"),
            "description": description,
            "displayOrder": int(data.get("displayOrder", 0)),
            "createdAt": now,
            "updatedAt": now
        }

        if col is not None:
            res = col.insert_one(doc)
            doc["_id"] = res.inserted_id
        else:
            doc["_id"] = "exp_mock_1"

        return serialize_doc(doc)

    @classmethod
    def update(cls, exp_id, data):
        col = cls.get_collection()
        if col is None:
            return None
        obj_id = to_object_id(exp_id)
        if not obj_id:
            return None

        description = data.get("description", [])
        if isinstance(description, str):
            description = [d.strip() for d in description.split("\n") if d.strip()]

        update_fields = {
            "title": data.get("title"),
            "company": data.get("company"),
            "employmentType": data.get("employmentType"),
            "status": data.get("status"),
            "startDate": data.get("startDate"),
            "endDate": data.get("endDate"),
            "currentlyWorking": bool(data.get("currentlyWorking", True)),
            "location": data.get("location"),
            "description": description,
            "displayOrder": int(data.get("displayOrder", 0)),
            "updatedAt": datetime.datetime.now(datetime.timezone.utc)
        }
        update_fields = {k: v for k, v in update_fields.items() if v is not None}

        col.update_one({"_id": obj_id}, {"$set": update_fields})
        return cls.get_by_id(exp_id)

    @classmethod
    def delete(cls, exp_id):
        col = cls.get_collection()
        if col is None:
            return True
        obj_id = to_object_id(exp_id)
        if not obj_id:
            return False
        res = col.delete_one({"_id": obj_id})
        return res.deleted_count > 0
