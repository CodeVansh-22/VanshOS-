from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from models.db import db_manager, serialize_doc, to_object_id
from utils.response import api_response
from schemas.validators import validate_required_fields

achievements_bp = Blueprint("achievements", __name__, url_prefix="/api/achievements")

@achievements_bp.route("", methods=["GET"])
def get_achievements():
    col = db_manager.get_collection("achievements")
    if col is None:
        return api_response(success=True, message="Achievements list", data=[
            {
                "id": "1",
                "title": "Bachelor of Computer Applications (BCA)",
                "description": "Graduated from YCMOU with 7.02 CGPA score.",
                "certificateImage": "",
                "date": "Completed"
            }
        ])
    items = list(col.find().sort("date", -1))
    return api_response(success=True, message="Achievements retrieved", data=serialize_doc(items))

from utils.file_uploader import save_uploaded_file

@achievements_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_certificate():
    if "file" not in request.files:
        return api_response(success=False, message="No file attached to payload", status_code=400)
    
    file = request.files["file"]
    file_path, err = save_uploaded_file(file, folder="achievements")
    if err:
        return api_response(success=False, message=err, status_code=400)

    return api_response(success=True, message="Certificate file uploaded successfully", data={"url": file_path, "fileName": file.filename})

@achievements_bp.route("", methods=["POST"])
@jwt_required()
def create_achievement():
    data = request.get_json() or {}
    valid, msg = validate_required_fields(data, ["title"])
    if not valid:
        return api_response(success=False, message=msg, status_code=400)

    cert_url = data.get("certificateUrl") or data.get("certificateImage") or data.get("fileName") or ""
    doc = {
        "title": data.get("title"),
        "issuer": data.get("issuer", ""),
        "score": data.get("score", ""),
        "description": data.get("description", ""),
        "certificateUrl": cert_url,
        "certificateImage": cert_url,
        "fileName": data.get("fileName", ""),
        "date": data.get("date", "2026")
    }

    col = db_manager.get_collection("achievements")
    if col is not None:
        res = col.insert_one(doc)
        doc["_id"] = res.inserted_id
    else:
        doc["_id"] = "mock_ach_id"

    return api_response(success=True, message="Achievement created", data=serialize_doc(doc), status_code=201)

@achievements_bp.route("/<achievement_id>", methods=["PUT"])
@jwt_required()
def update_achievement(achievement_id):
    data = request.get_json() or {}
    col = db_manager.get_collection("achievements")
    if col is None:
        return api_response(success=True, message="Achievement updated (mock mode)")

    obj_id = to_object_id(achievement_id)
    if not obj_id:
        return api_response(success=False, message="Invalid ID", status_code=400)

    col.update_one({"_id": obj_id}, {"$set": data})
    doc = col.find_one({"_id": obj_id})
    return api_response(success=True, message="Achievement updated", data=serialize_doc(doc))

@achievements_bp.route("/<achievement_id>", methods=["DELETE"])
@jwt_required()
def delete_achievement(achievement_id):
    col = db_manager.get_collection("achievements")
    if col is None:
        return api_response(success=True, message="Achievement deleted")

    obj_id = to_object_id(achievement_id)
    if not obj_id:
        return api_response(success=False, message="Invalid ID", status_code=400)

    col.delete_one({"_id": obj_id})
    return api_response(success=True, message="Achievement deleted successfully")
