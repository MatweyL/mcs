def handler(obj):
    if hasattr(obj, 'to_json'):
        return obj.to_json()