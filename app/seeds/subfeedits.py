from app.models import db, Subfeedit


def seed_subfeedits():

    subfeedit1 = Subfeedit(
        name="General"
    )

    subfeedit2 = Subfeedit(
        name="Food"
    )

    subfeedit3 = Subfeedit(
        name="Breakfast"
    )

    subfeedit4 = Subfeedit(
        name="Lunch"
    )

    subfeedit5 = Subfeedit(
        name="Dinner"
    )

    subfeedit6 = Subfeedit(
        name="Snacks"
    )

    subfeedit7 = Subfeedit(
        name="African"
    )

    subfeedit8 = Subfeedit(
        name="American"
    )

    subfeedit9 = Subfeedit(
        name="Asian"
    )

    subfeedit10 = Subfeedit(
        name="European"
    )

    subfeedit11 = Subfeedit(
        name="Chinese"
    )

    subfeedit12 = Subfeedit(
        name="English"
    )

    subfeedit13 = Subfeedit(
        name="French"
    )

    subfeedit14 = Subfeedit(
        name="Greek"
    )

    subfeedit15 = Subfeedit(
        name="Italian"
    )

    subfeedit16 = Subfeedit(
        name="Japanese"
    )

    subfeedit17 = Subfeedit(
        name="Korean"
    )

    subfeedit18 = Subfeedit(
        name="Mexican"
    )

    subfeedit19 = Subfeedit(
        name="Russian"
    )

    subfeedit20 = Subfeedit(
        name="Spanish"
    )

    db.session.add(subfeedit1)
    db.session.add(subfeedit2)
    db.session.add(subfeedit3)
    db.session.add(subfeedit4)
    db.session.add(subfeedit5)
    db.session.add(subfeedit6)
    db.session.add(subfeedit7)
    db.session.add(subfeedit8)
    db.session.add(subfeedit9)
    db.session.add(subfeedit10)
    db.session.add(subfeedit11)
    db.session.add(subfeedit12)
    db.session.add(subfeedit13)
    db.session.add(subfeedit14)
    db.session.add(subfeedit15)
    db.session.add(subfeedit16)
    db.session.add(subfeedit17)
    db.session.add(subfeedit18)
    db.session.add(subfeedit19)
    db.session.add(subfeedit20)

    db.session.commit()


def undo_subfeedits():
    db.session.execute("TRUNCATE subfeedits RESTART IDENTITY CASCADE;")
    db.session.commit()
