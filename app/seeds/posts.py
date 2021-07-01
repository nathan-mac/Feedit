from app.models import db, Post


def seed_posts():

    post1 = Post(
        title="first post",
        content="hello everyone",
        userId="1",
        subfeeditId="1",
        time="2020-12-19 17:21:35"
    )

    post2 = Post(
        title="cabbages",
        content="cabbages are food",
        userId="2",
        subfeeditId="2",
        time="2020-12-16 03:12:59"
    )

    post3 = Post(
        title="what should i eat?",
        content="pick something for me to eat",
        userId="2",
        subfeeditId="1",
        time="2020-12-21 18:36:22"
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()


def undo_posts():
    db.session.execute("TRUNCATE posts RESTART IDENTITY CASCADE;")
    db.session.commit()
