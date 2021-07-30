from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms import validators
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    content = TextAreaField("Content")
    userId = IntegerField("UserId")
    subfeeditId = IntegerField("SubfeeditId")
    time = StringField("Time")
