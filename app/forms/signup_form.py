from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exists", field.data)
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("User is already registered.")


def email_exists(form, field):
    print("Checking if email exists", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email is already registered.")


def password_match(form, field):
    print("Checking if passwords patch", field.data)
    password = field.data
    confirm = form.data['repeatPassword']
    if not password == confirm:
        raise ValidationError("Passwords do not match.")


class SignUpForm(FlaskForm):
    username = StringField(
        'Username',
        validators=[DataRequired(), user_exists]
    )
    email = StringField(
        'Email',
        validators=[DataRequired(), email_exists, Email()]
    )
    password = StringField(
        'Password',
        validators=[DataRequired(), password_match]
    )
    repeatPassword = StringField(
        'repeatPassword',
        validators=[DataRequired()]
    )
