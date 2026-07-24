from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from services.message_service import MessageService
from utils.response import api_response
from schemas.validators import validate_required_fields, validate_email

messages_bp = Blueprint("messages", __name__, url_prefix="/api")

@messages_bp.route("/contact", methods=["POST"])
@messages_bp.route("/messages", methods=["POST"])
def send_message():
    data = request.get_json() or {}
    valid, msg = validate_required_fields(data, ["name", "email", "message"])
    if not valid:
        return api_response(success=False, message=msg, status_code=400)

    valid_email, email_err = validate_email(data.get("email"))
    if not valid_email:
        return api_response(success=False, message=email_err, status_code=400)

    created = MessageService.create(data)
    return api_response(success=True, message="Transmission sent successfully", data=created, status_code=201)

@messages_bp.route("/messages", methods=["GET"])
@jwt_required()
def get_messages():
    messages = MessageService.get_all()
    return api_response(success=True, message="Messages inbox retrieved", data=messages)

@messages_bp.route("/messages/<message_id>/status", methods=["PATCH"])
@jwt_required()
def update_status(message_id):
    data = request.get_json() or {}
    status = data.get("status", "read")
    success = MessageService.update_status(message_id, status)
    if not success:
        return api_response(success=False, message="Message not found", status_code=404)
    return api_response(success=True, message=f"Message status updated to {status}")

@messages_bp.route("/messages/<message_id>", methods=["DELETE"])
@jwt_required()
def delete_message(message_id):
    success = MessageService.delete(message_id)
    if not success:
        return api_response(success=False, message="Message not found", status_code=404)
    return api_response(success=True, message="Message deleted successfully")
