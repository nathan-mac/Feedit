# Robinhoop


Access the app [here](https://feedit-project.herokuapp.com/).


Feedit is a reddit clone based on food. Users can write and read posts categorized by different subfeedits to share ideas about food.


# Technologies Used


* Python 3.9.4
* Javascript ES6
* React.js
* Flask
* PostgreSQL
* Heroku


# Documentation


[Github Repository Wiki](https://github.com/nathan-mac/Feedit/wiki)


# Features


* Sign up a new account
* Log in and log out
* View posts on different feeds
* Create, edit and delete posts in different subfeedits
* Subscribe and unsubscribe to subfeedits to customize home feed
* View a listing of all current categories
* Search for posts relevant to the query


# Technical Details
Feedit uses Python based Flask with Javascript based React. The API routes work with a PostgreSQL database.

Account related routes are protected with user authentication, meaning all actions that require ownership are only allowed by the correct logged in user.

Posts can be viewed through different feeds, using subfeedits as categories.

Posts can be created, edited, or deleted by an authorized logged in user.

Data fetched from the API routes are used to populate feeds, manipulate posts, and work with subscriptions to customize said feeds and posts.

A user can use the search bar to query for posts containing the query in either the title or the content of the post.


# Todo:


* General site design
* Bug fix on removing subscriptions
* Implementing comments
* Voting
