from flask import Blueprint, jsonify
from app.models import Subfeedit

subfeedit_routes = Blueprint("subfeedits", __name__)


@subfeedit_routes.route("/")
def subfeedits():
    subfeedits = Subfeedit.query.order_by(Subfeedit.id.asc()).all()
    return {"subfeedits": [subfeedit.to_dict() for subfeedit in subfeedits]}


@subfeedit_routes.route("/<string:name>")
def subfeedit(name):
    subfeedit = Subfeedit.query.filter(Subfeedit.name == name)
    return {"subfeedit": subfeedit.to_dict()}
