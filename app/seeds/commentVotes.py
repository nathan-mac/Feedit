from app.models import db, CommentVote


def seed_commentvotes():

    commentvote1 = CommentVote(
        userId="1",
        commentId="1",
        vote="up"
    )

    commentvote2 = CommentVote(
        userId="1",
        commentId="2",
        vote="up"
    )

    commentvote3 = CommentVote(
        userId="2",
        commentId="1",
        vote="up"
    )

    db.session.add(commentvote1)
    db.session.add(commentvote2)
    db.session.add(commentvote3)

    db.session.commit()


def undo_commentvotes():
    db.session.execute("TRUNCATE commentvotes RESTART IDENTITY CASCADE;")
    db.session.commit()
