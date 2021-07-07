from typing import ContextManager
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms import validators
from wtforms.fields.core import IntegerField
from wtforms.validators import DataRequired


class PostForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    content = TextAreaField("Content", validators=[DataRequired()])
    userId = IntegerField("UserID", validators=[DataRequired()])
    subfeeditId = IntegerField("SubfeeditID", validators=[DataRequired()])
    time = StringField("Time", validators=[DataRequired()])
