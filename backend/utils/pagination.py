def paginate_cursor(cursor, page=1, limit=10):
    try:
        page = max(1, int(page))
        limit = max(1, min(100, int(limit)))
    except (ValueError, TypeError):
        page = 1
        limit = 10
        
    skip = (page - 1) * limit
    paginated_cursor = cursor.skip(skip).limit(limit)
    return paginated_cursor, page, limit
