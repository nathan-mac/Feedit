from flask.cli import AppGroup
from .comments import seed_comments, undo_comments
from .commentVotes import seed_commentvotes, undo_commentvotes
from .posts import seed_posts, undo_posts
from .postVotes import seed_postvotes, undo_postvotes
from .subfeedits import seed_subfeedits, undo_subfeedits
from .subscriptions import seed_subscriptions, undo_subscriptions
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_subfeedits()
    seed_subscriptions()
    seed_posts()
    seed_postvotes()
    seed_comments()
    seed_commentvotes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_subfeedits()
    undo_subscriptions()
    undo_posts()
    undo_postvotes()
    undo_comments()
    undo_commentvotes()
    # Add other undo functions here
