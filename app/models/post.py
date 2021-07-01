from .db import db
from sqlalchemy.sql import func


class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    title = db.Column(
        db.String(255),
        nullable=False
    )
    content = db.Column(
        db.String(1000)
    )
    userId = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )
    subfeeditId = db.Column(
        db.Integer,
        nullable=False
    )
    time = db.Column(
        db.DateTime,
        default=func.now(),
        nullable=False

    )

    user = db.relationship("User")
    subfeedit = db.relationship("Subfeedit")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "userId": self.userId,
            "subfeeditId": self.subfeeditId,
            "time": self.time
        }
