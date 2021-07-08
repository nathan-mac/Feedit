from .db import db


class Subfeedit(db.Model):
    __tablename__ = "subfeedits"

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    name = db.Column(
        db.String(40)
    )

    users = db.relationship("User", secondary="subscriptions")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
