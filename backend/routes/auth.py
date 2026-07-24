from flask import Blueprint, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
import bcrypt
from models.db import db_manager, serialize_doc
from utils.response import api_response
from schemas.validators import validate_required_fields, validate_email

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()

    if not email:
        return api_response(success=False, message="Email is required", status_code=400)

    # Direct admin access — no password, no DB check
    username = "Vansh Chauhan"
    role = "administrator"

    access_token = create_access_token(identity=email, additional_claims={"role": role, "username": username})
    refresh_token = create_refresh_token(identity=email)

    return api_response(
        success=True,
        message="Authentication successful",
        data={
            "token": access_token,
            "refreshToken": refresh_token,
            "user": {
                "email": email,
                "username": username,
                "role": role
            }
        }
    )

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity)
    return api_response(
        success=True,
        message="Token refreshed successfully",
        data={"token": new_access_token}
    )

@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return api_response(success=True, message="Session terminated successfully")

@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_admin():
    identity = get_jwt_identity()
    claims = get_jwt()
    return api_response(
        success=True,
        message="Admin profile retrieved",
        data={
            "email": identity,
            "role": claims.get("role", "administrator"),
            "username": claims.get("username", "Vansh Chauhan")
        }
    )
