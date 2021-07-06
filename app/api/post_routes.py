from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Post

post_routes = Blueprint("posts", __name__)


@post_routes.route("/")
@login_required
def posts():
    posts = Post.query.order_by(Post.time.desc()).all()
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route("/<int:id>")
def post(id):
    post = Post.query.get(id)
    return post.to_dict()
