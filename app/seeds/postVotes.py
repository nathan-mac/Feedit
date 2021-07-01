from app.models import db, PostVote


def seed_postvotes():

    postvote1 = PostVote(
        userId="2",
        postId="3",
        vote="up"
    )

    postvote2 = PostVote(
        userId="1",
        postId="2",
        vote="up"
    )

    postvote3 = PostVote(
        userId="2",
        postId="1",
        vote="up"
    )

    db.session.add(postvote1)
    db.session.add(postvote2)
    db.session.add(postvote3)

    db.session.commit()


def undo_postvotes():
    db.session.execute("TRUNCATE postvotes RESTART IDENTITY CASCADE;")
    db.session.commit()
