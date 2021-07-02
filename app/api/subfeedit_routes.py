from flask import Blueprint, jsonify
from app.models import Subfeedit, subfeedit

subfeedit_routes = Blueprint("subfeedits", __name__)


@subfeedit_routes.route("/")
def subfeedits():
    subfeedits = Subfeedit.query.order_by(Subfeedit.id.asc()).all()
    return {"subfeedits": [subfeedit.to_dict() for subfeedit in subfeedits]}
