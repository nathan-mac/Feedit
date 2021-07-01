from .db import db


class Subscription(db.Model):
    __tablename__ = "subscriptions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    userId = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )
    subfeeditId = db.Column(
        db.Integer,
        db.ForeignKey("subfeedits.id"),
        nullable=False
    )

    user = db.relationship("User")
    subfeedit = db.relationship("Subfeedit")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "subfeeditId": self.subfeeditId
        }
