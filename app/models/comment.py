from typing import Text
from .db import db
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    userId = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )
    postId = db.Column(
        db.Integer,
        db.ForeignKey("posts.id"),
        nullable=False
    )
    text = db.Column(
        db.String(1000),
        nullable=False
    )
    time = db.Column(
        db.DateTime,
        default=func.now(),
        nullable=False
    )

    user = db.relationship("User")
    post = db.relationship("Post")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "text": self.text,
            "time": self.time
        }
