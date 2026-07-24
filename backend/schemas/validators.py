import re

EMAIL_REGEX = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
URL_REGEX = r'^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$'

def validate_email(email):
    if not email or not isinstance(email, str):
        return False, "Email is required"
    if not re.match(EMAIL_REGEX, email):
        return False, "Invalid email format"
    return True, None

def validate_url(url):
    if not url:
        return True, None
    if not re.match(URL_REGEX, url):
        return False, "Invalid URL format"
    return True, None

def validate_required_fields(data, required_fields):
    if not isinstance(data, dict):
        return False, "Invalid JSON payload"
    missing = [field for field in required_fields if field not in data or data[field] is None or data[field] == ""]
    if missing:
        return False, f"Missing required fields: {', '.join(missing)}"
    return True, None
