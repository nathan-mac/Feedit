from .db import db


class PostVote(db.Model):
    __tablename__ = "postvotes"

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
    vote = db.Column(
        db.String(5),
        nullable=False
    )

    user = db.relationship("User")
    post = db.relationship("Post")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "vote": self.vote
        }
