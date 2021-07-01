from app.models import db, Comment


def seed_comments():

    comment1 = Comment(
        userId="1",
        postId="1",
        text="hello op here",
        time="2020-12-19 17:22:06"
    )

    comment2 = Comment(
        userId="1",
        postId="2",
        text="i like your post",
        time="2020-12-18 09:08:43"
    )

    comment3 = Comment(
        userId="2",
        postId="1",
        text="i like your post, too",
        time="2020-12-19 18:11:53"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()


def undo_comments():
    db.session.execute("TRUNCATE comments RESTART IDENTITY CASCADE;")
    db.session.commit()
