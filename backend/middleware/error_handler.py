from utils.response import api_response

def register_error_handlers(app):
    
    @app.errorhandler(400)
    def bad_request(e):
        return api_response(success=False, message=str(e.description or "Bad request payload"), status_code=400)
        
    @app.errorhandler(401)
    def unauthorized(e):
        return api_response(success=False, message="Unauthorized access token", status_code=401)
        
    @app.errorhandler(403)
    def forbidden(e):
        return api_response(success=False, message="Forbidden request", status_code=403)
        
    @app.errorhandler(404)
    def not_found(e):
        return api_response(success=False, message="Resource or endpoint not found", status_code=404)

    @app.errorhandler(413)
    def payload_too_large(e):
        return api_response(success=False, message="Uploaded file exceeds 16MB limit", status_code=413)

    @app.errorhandler(429)
    def too_many_requests(e):
        return api_response(success=False, message="Rate limit exceeded. Please try again later.", status_code=429)

    @app.errorhandler(500)
    def internal_error(e):
        return api_response(success=False, message="Internal server error", status_code=500)
