from app.models import db, Subscription


def seed_subscriptions():

    sub1 = Subscription(
        userId="1",
        subfeeditId="1"
    )

    sub2 = Subscription(
        userId="1",
        subfeeditId="2"
    )

    sub3 = Subscription(
        userId="2",
        subfeeditId="1"
    )

    db.session.add(sub1)
    db.session.add(sub2)
    db.session.add(sub3)

    db.session.commit()


def undo_subscriptions():
    db.session.execute("TRUNCATE subscriptions RESTART IDENTITY CASCADE;")
    db.session.commit()
