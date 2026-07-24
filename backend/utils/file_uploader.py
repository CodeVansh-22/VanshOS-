import os
import uuid
from werkzeug.utils import secure_filename
from flask import current_app

def allowed_file(filename):
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in current_app.config.get("ALLOWED_EXTENSIONS", {"pdf", "png", "jpg", "jpeg", "webp"})

def save_uploaded_file(file, folder="general"):
    if not file or file.filename == "":
        return None, "No file provided"
    
    if not allowed_file(file.filename):
        return None, "File extension not allowed"
    
    filename = secure_filename(file.filename)
    ext = filename.rsplit(".", 1)[1].lower() if "." in filename else "bin"
    unique_filename = f"{uuid.uuid4().hex}_{filename}"
    
    target_dir = os.path.join(current_app.config["UPLOAD_FOLDER"], folder)
    os.makedirs(target_dir, exist_ok=True)
    
    file_path = os.path.join(target_dir, unique_filename)
    file.save(file_path)
    
    # Relative path for serving
    relative_path = f"/uploads/{folder}/{unique_filename}"
    return relative_path, None
