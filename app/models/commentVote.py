from .db import db


class CommentVote(db.Model):
    __tablename__ = "commentvotes"

    id = db.Column(
        db.Integer,
        primary_key=True
    )
    userId = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )
    commentId = db.Column(
        db.Integer,
        db.ForeignKey("comments.id"),
        nullable=False
    )
    vote = db.Column(
        db.String(5),
        nullable=False
    )

    user = db.relationship("User")
    comment = db.relationship("Comment")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "commentId": self.commentId,
            "vote": self.vote
        }
