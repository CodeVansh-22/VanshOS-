import datetime
from models.db import db_manager, serialize_doc, to_object_id
from utils.slug import generate_slug

class ProjectService:
    @staticmethod
    def get_collection():
        return db_manager.get_collection("projects")

    @classmethod
    def get_all(cls, featured_only=False):
        col = cls.get_collection()
        if col is None:
            # Fallback mock data if DB not connected
            return [
                {
                    "id": "1",
                    "title": "VanshOS Luxury Portfolio",
                    "slug": "vanshos-luxury-portfolio",
                    "description": "High-end personal product inspired by Apple and Framer.",
                    "techStack": ["Next.js", "Tailwind CSS", "Framer Motion", "Flask"],
                    "github": "https://github.com/CodeVansh-22",
                    "liveDemo": "https://vanshos.vercel.app",
                    "featured": True,
                    "displayOrder": 1,
                    "createdAt": datetime.datetime.now().isoformat()
                }
            ]
        
        query = {"featured": True} if featured_only else {}
        projects = list(col.find(query).sort("displayOrder", 1))
        return serialize_doc(projects)

    @classmethod
    def get_by_id(cls, project_id):
        col = cls.get_collection()
        if col is None:
            return None
        obj_id = to_object_id(project_id)
        if not obj_id:
            return None
        doc = col.find_one({"_id": obj_id})
        return serialize_doc(doc)

    @classmethod
    def create(cls, data):
        col = cls.get_collection()
        now = datetime.datetime.now(datetime.timezone.utc)
        live_url = data.get("liveDemo") or data.get("demo") or ""
        doc = {
            "title": data.get("title"),
            "slug": generate_slug(data.get("title")),
            "description": data.get("description", ""),
            "techStack": data.get("techStack", []),
            "github": data.get("github", ""),
            "liveDemo": live_url,
            "demo": live_url,
            "image": data.get("image", ""),
            "featured": bool(data.get("featured", False)),
            "displayOrder": int(data.get("displayOrder", 0)),
            "createdAt": now,
            "updatedAt": now
        }
        if col is not None:
            res = col.insert_one(doc)
            doc["_id"] = res.inserted_id
        else:
            doc["_id"] = "mock_id"
        return serialize_doc(doc)

    @classmethod
    def update(cls, project_id, data):
        col = cls.get_collection()
        if col is None:
            return None
        obj_id = to_object_id(project_id)
        if not obj_id:
            return None
            
        update_data = {
            "updatedAt": datetime.datetime.now(datetime.timezone.utc)
        }
        for k in ["title", "description", "techStack", "github", "liveDemo", "image", "featured", "displayOrder"]:
            if k in data:
                update_data[k] = data[k]
        if "title" in data:
            update_data["slug"] = generate_slug(data["title"])
            
        col.update_one({"_id": obj_id}, {"$set": update_data})
        return cls.get_by_id(project_id)

    @classmethod
    def delete(cls, project_id):
        col = cls.get_collection()
        if col is None:
            return True
        obj_id = to_object_id(project_id)
        if not obj_id:
            return False
        res = col.delete_one({"_id": obj_id})
        return res.deleted_count > 0
