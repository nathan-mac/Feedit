from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Post, User
from app.forms import PostForm
from app import db
import datetime

post_routes = Blueprint("posts", __name__)


@post_routes.route("/")
def posts():
    posts = Post.query.order_by(Post.time.desc()).all()
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route("/<int:id>")
def post(id):
    post = Post.query.get(id)
    return {"post": post.to_dict()}


@post_routes.route("/new-post", methods=["POST"])
@login_required
def new_post():
    user = User.query.get(current_user.id)
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            title=form.data["title"],
            content=form.data["content"],
            userId=user.id,
            subfeeditId=form.data["subfeeditId"],
            time=datetime.datetime.now()
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route("/edit-post/<int:id>", methods=["POST"])
@login_required
def edit_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        post.title = form.data["title"]
        post.content = form.data["content"]
        db.session.commit()
        return post.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route("/delete/<int:id>")
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return None
