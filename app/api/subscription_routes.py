from flask import Blueprint, jsonify
from app.models import Subscription
from app import db

subscription_routes = Blueprint("subscriptions", __name__)


@subscription_routes.route("/")
def all_subscriptions():
    subscriptions = Subscription.query.all()
    return {
        "allSubscriptions": [sub.to_dict() for sub in subscriptions]
    }


@subscription_routes.route("/<int:id>/")
def subscriptions(id):
    subscriptions = Subscription.query.filter(Subscription.userId == id)
    return {
        "subscriptions": [sub.to_dict() for sub in subscriptions]
    }


@subscription_routes.route("/add/<int:userId>/<int:subId>/")
def add_subscription(userId, subId):
    sub = Subscription(
        userId=userId,
        subfeeditId=subId
    )
    db.session.add(sub)
    db.session.commit()
    return sub.to_dict()


@subscription_routes.route("/remove/<int:subscriptionId>/")
def remove_subscription(subscriptionId):
    sub = Subscription.query.get(subscriptionId)
    db.session.delete(sub)
    db.session.commit()
    return sub.to_dict()
