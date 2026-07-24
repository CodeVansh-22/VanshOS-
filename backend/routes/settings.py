from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from models.db import db_manager, serialize_doc
from utils.response import api_response

settings_bp = Blueprint("settings", __name__, url_prefix="/api/settings")

@settings_bp.route("", methods=["GET"])
def get_settings():
    col = db_manager.get_collection("settings")
    if col is None:
        return api_response(success=True, message="Settings retrieved", data={
            "siteTitle": "VanshOS — Vansh Sunil Chauhan",
            "logo": "VanshOS",
            "theme": "dark",
            "seoTitle": "VanshOS Luxury Portfolio",
            "seoDescription": "Personal portfolio and digital suite of Vansh Sunil Chauhan."
        })
        
    doc = col.find_one({})
    if not doc:
        doc = {
            "siteTitle": "VanshOS — Vansh Sunil Chauhan",
            "logo": "VanshOS",
            "theme": "dark",
            "seoTitle": "VanshOS Luxury Portfolio",
            "seoDescription": "Personal portfolio and digital suite of Vansh Sunil Chauhan."
        }
        res = col.insert_one(doc)
        doc["_id"] = res.inserted_id
        
    return api_response(success=True, message="Settings retrieved", data=serialize_doc(doc))

@settings_bp.route("", methods=["PUT"])
@jwt_required()
def update_settings():
    data = request.get_json() or {}
    col = db_manager.get_collection("settings")
    if col is not None:
        col.update_one({}, {"$set": data}, upsert=True)
    return get_settings()
