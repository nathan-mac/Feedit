from app.models import db, Subfeedit


def seed_subfeedits():

    subfeedit1 = Subfeedit(
        name="General"
    )

    subfeedit2 = Subfeedit(
        name="Food"
    )

    db.session.add(subfeedit1)
    db.session.add(subfeedit2)

    db.session.commit()


def undo_subfeedits():
    db.session.execute("TRUNCATE subfeedits RESTART IDENTITY CASCADE;")
    db.session.commit()
