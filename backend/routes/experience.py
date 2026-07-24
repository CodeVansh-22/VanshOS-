from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from services.experience_service import ExperienceService
from utils.response import api_response
from schemas.validators import validate_required_fields

experience_bp = Blueprint("experience", __name__, url_prefix="/api/experience")

@experience_bp.route("", methods=["GET"])
def get_experiences():
    experiences = ExperienceService.get_all()
    return api_response(success=True, message="Experiences retrieved", data=experiences)

@experience_bp.route("/<exp_id>", methods=["GET"])
def get_experience(exp_id):
    exp = ExperienceService.get_by_id(exp_id)
    if not exp:
        return api_response(success=False, message="Experience record not found", status_code=404)
    return api_response(success=True, message="Experience details", data=exp)

@experience_bp.route("", methods=["POST"])
@jwt_required()
def create_experience():
    data = request.get_json() or {}
    valid, msg = validate_required_fields(data, ["title", "company"])
    if not valid:
        return api_response(success=False, message=msg, status_code=400)

    exp = ExperienceService.create(data)
    return api_response(success=True, message="Experience added successfully", data=exp, status_code=201)

@experience_bp.route("/<exp_id>", methods=["PUT"])
@jwt_required()
def update_experience(exp_id):
    data = request.get_json() or {}
    updated = ExperienceService.update(exp_id, data)
    if not updated:
        return api_response(success=False, message="Experience record not found", status_code=404)
    return api_response(success=True, message="Experience updated successfully", data=updated)

@experience_bp.route("/<exp_id>", methods=["DELETE"])
@jwt_required()
def delete_experience(exp_id):
    success = ExperienceService.delete(exp_id)
    if not success:
        return api_response(success=False, message="Failed to delete experience", status_code=400)
    return api_response(success=True, message="Experience deleted successfully")
