import os
import sys

# Ensure backend root is in Python sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from config import Config
from models.db import db_manager
from middleware.error_handler import register_error_handlers
import bcrypt

# Import All Route Blueprints
from routes.auth import auth_bp
from routes.projects import projects_bp
from routes.skills import skills_bp
from routes.experience import experience_bp
from routes.achievements import achievements_bp
from routes.messages import messages_bp
from routes.resume import resume_bp
from routes.analytics import analytics_bp
from routes.settings import settings_bp

limiter = Limiter(key_func=get_remote_address, default_limits=["100000 per day", "10000 per hour"])

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    allowed_origins = list(set([
        frontend_url.rstrip("/"),
        "https://vanshos.vercel.app",
        "https://vansh-os-eight.vercel.app",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]))

    # Enable Cross-Origin Resource Sharing (CORS) with Production Origins
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}}, supports_credentials=True)

    # Security Headers Middleware
    @app.after_request
    def set_security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "SAMEORIGIN"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        return response

    # Initialize Extensions
    JWTManager(app)
    limiter.init_app(app)
    db_manager.init_app(app)

    # Register Error Handlers
    register_error_handlers(app)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(projects_bp)
    app.register_blueprint(skills_bp)
    app.register_blueprint(experience_bp)
    app.register_blueprint(achievements_bp)
    app.register_blueprint(messages_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(settings_bp)

    # Static File Uploads Server Route
    @app.route("/uploads/<path:filename>")
    def serve_upload(filename):
        return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

    # Root Health Check
    @app.route("/health", methods=["GET"])
    @app.route("/", methods=["GET"])
    def health_check():
        return {
            "status": "online",
            "service": "VanshOS Backend API",
            "version": "1.0.0",
            "db_status": "connected" if db_manager.db is not None else "mock_fallback"
        }

    # Seed Initial Admin User if DB connected
    with app.app_context():
        try:
            admins_col = db_manager.get_collection("admins")
            if admins_col is not None and admins_col.count_documents({}) == 0:
                hashed_pw = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                admins_col.insert_one({
                    "username": "Vansh Chauhan",
                    "email": "vanshchauhand@gmail.com",
                    "password": hashed_pw,
                    "role": "administrator"
                })
                print("[*] Default admin seeded: vanshchauhand@gmail.com")
        except Exception as e:
            print(f"[!] Admin seeding skipped: {e}")

    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True, use_reloader=False)

