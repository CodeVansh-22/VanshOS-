from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from services.project_service import ProjectService
from utils.response import api_response
from schemas.validators import validate_required_fields

projects_bp = Blueprint("projects", __name__, url_prefix="/api/projects")

@projects_bp.route("", methods=["GET"])
def get_projects():
    featured_only = request.args.get("featured", "false").lower() == "true"
    projects = ProjectService.get_all(featured_only=featured_only)
    return api_response(success=True, message="Projects retrieved", data=projects)

@projects_bp.route("/<project_id>", methods=["GET"])
def get_project(project_id):
    project = ProjectService.get_by_id(project_id)
    if not project:
        return api_response(success=False, message="Project not found", status_code=404)
    return api_response(success=True, message="Project details", data=project)

@projects_bp.route("", methods=["POST"])
@jwt_required()
def create_project():
    data = request.get_json() or {}
    valid, msg = validate_required_fields(data, ["title"])
    if not valid:
        return api_response(success=False, message=msg, status_code=400)

    project = ProjectService.create(data)
    return api_response(success=True, message="Project created successfully", data=project, status_code=201)

@projects_bp.route("/<project_id>", methods=["PUT"])
@jwt_required()
def update_project(project_id):
    data = request.get_json() or {}
    updated = ProjectService.update(project_id, data)
    if not updated:
        return api_response(success=False, message="Project not found", status_code=404)
    return api_response(success=True, message="Project updated successfully", data=updated)

@projects_bp.route("/<project_id>", methods=["DELETE"])
@jwt_required()
def delete_project(project_id):
    success = ProjectService.delete(project_id)
    if not success:
        return api_response(success=False, message="Project not found or already deleted", status_code=404)
    return api_response(success=True, message="Project deleted successfully")
