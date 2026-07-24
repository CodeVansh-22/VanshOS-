from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from models.db import db_manager, serialize_doc, to_object_id
from utils.response import api_response
from schemas.validators import validate_required_fields

skills_bp = Blueprint("skills", __name__, url_prefix="/api/skills")

@skills_bp.route("", methods=["GET"])
def get_skills():
    col = db_manager.get_collection("skills")
    if col is None:
        return api_response(success=True, message="Skills list", data=[])
    skills = list(col.find().sort("order", 1))
    return api_response(success=True, message="Skills retrieved", data=serialize_doc(skills))

@skills_bp.route("", methods=["POST"])
@jwt_required()
def create_skill():
    data = request.get_json() or {}
    print(f"[*] POST /api/skills received data: {data}")
    valid, msg = validate_required_fields(data, ["name", "category"])
    if not valid:
        print(f"[*] Validation failed: {msg}")
        return api_response(success=False, message=msg, status_code=400)

    doc = {
        "name": data.get("name"),
        "category": data.get("category"),
        "level": data.get("level", "Advanced"),
        "icon": data.get("icon", "FiCode"),
        "order": int(data.get("order", 0))
    }
    
    col = db_manager.get_collection("skills")
    if col is not None:
        res = col.insert_one(doc)
        doc["_id"] = res.inserted_id
        print(f"[*] Inserted into MongoDB Atlas successfully! Collection='skills', _id={res.inserted_id}")
    else:
        doc["_id"] = str(ObjectId())
        print("[!] Warning: db_manager.get_collection('skills') returned None! Operating in Mock Mode.")

    return api_response(success=True, message="Skill added", data=serialize_doc(doc), status_code=201)

@skills_bp.route("/<skill_id>", methods=["PUT"])
@jwt_required()
def update_skill(skill_id):
    data = request.get_json() or {}
    col = db_manager.get_collection("skills")
    if col is None:
        return api_response(success=True, message="Skill updated (mock mode)")

    obj_id = to_object_id(skill_id)
    if not obj_id:
        return api_response(success=False, message="Invalid skill ID", status_code=400)

    col.update_one({"_id": obj_id}, {"$set": data})
    doc = col.find_one({"_id": obj_id})
    return api_response(success=True, message="Skill updated", data=serialize_doc(doc))

@skills_bp.route("/<skill_id>", methods=["DELETE"])
@jwt_required()
def delete_skill(skill_id):
    col = db_manager.get_collection("skills")
    if col is None:
        return api_response(success=True, message="Skill deleted")

    obj_id = to_object_id(skill_id)
    if not obj_id:
        return api_response(success=False, message="Invalid skill ID", status_code=400)

    col.delete_one({"_id": obj_id})
    return api_response(success=True, message="Skill deleted successfully")
