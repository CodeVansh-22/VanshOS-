import os
from flask import Blueprint, request, send_from_directory, current_app
from flask_jwt_extended import jwt_required
from services.resume_service import ResumeService
from utils.file_uploader import save_uploaded_file
from utils.response import api_response

resume_bp = Blueprint("resume", __name__, url_prefix="/api/resume")

@resume_bp.route("", methods=["GET"])
@resume_bp.route("/stats", methods=["GET"])
def get_resume_info():
    info = ResumeService.get_info()
    return api_response(success=True, message="Resume metadata", data=info)

@resume_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_resume():
    if "file" not in request.files:
        return api_response(success=False, message="No file attached to payload", status_code=400)
    
    file = request.files["file"]
    file_path, err = save_uploaded_file(file, folder="resume")
    if err:
        return api_response(success=False, message=err, status_code=400)

    info = ResumeService.update_resume(file.filename, file_path)
    return api_response(success=True, message="Resume uploaded successfully", data=info)

@resume_bp.route("/view", methods=["GET"])
def view_resume():
    info = ResumeService.get_info()
    file_path = info.get("filePath", "")
    if file_path.startswith("/uploads/"):
        rel_subpath = file_path.replace("/uploads/", "")
        upload_folder = current_app.config["UPLOAD_FOLDER"]
        full_disc_path = os.path.join(upload_folder, rel_subpath)
        if os.path.exists(full_disc_path):
            dir_name, file_name = os.path.split(full_disc_path)
            return send_from_directory(dir_name, file_name, as_attachment=False, mimetype='application/pdf')
            
    return api_response(success=False, message="Resume file not uploaded yet", status_code=404)

@resume_bp.route("/download", methods=["GET"])
def download_resume():
    downloads = ResumeService.increment_download()
    info = ResumeService.get_info()
    file_path = info.get("filePath", "")
    
    # Clean relative path to serve file
    if file_path.startswith("/uploads/"):
        rel_subpath = file_path.replace("/uploads/", "")
        upload_folder = current_app.config["UPLOAD_FOLDER"]
        full_disc_path = os.path.join(upload_folder, rel_subpath)
        if os.path.exists(full_disc_path):
            dir_name, file_name = os.path.split(full_disc_path)
            return send_from_directory(dir_name, file_name, as_attachment=True)
            
    return api_response(
        success=True, 
        message="Resume download recorded", 
        data={"downloads": downloads, "file": info.get("fileName")}
    )
