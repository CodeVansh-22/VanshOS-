import re
import unicodedata

def generate_slug(text):
    if not text:
        return ""
    # Normalize unicode characters
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    # Lowercase and replace non-alphanumeric chars with hyphens
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '-', text)
