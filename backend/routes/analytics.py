from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from services.analytics_service import AnalyticsService
from utils.response import api_response

analytics_bp = Blueprint("analytics", __name__, url_prefix="/api/analytics")

@analytics_bp.route("/visitor", methods=["POST"])
def log_visitor():
    data = request.get_json() or {}
    record = AnalyticsService.log_visitor(data)
    return api_response(success=True, message="Visitor log recorded", data=record)

@analytics_bp.route("/dashboard", methods=["GET"])
@analytics_bp.route("/overview", methods=["GET"])
def get_dashboard_analytics():
    stats = AnalyticsService.get_dashboard_stats()
    return api_response(success=True, message="Analytics overview", data=stats)
