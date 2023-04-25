Here's the updated README file based on the provided methods:

Fabrique Cinema Company RESTful API
This is a RESTful API for the Fabrique Cinema Company. It provides endpoints for managing movies, theaters, screenings, tickets, and users.

Getting Started
Prerequisites
Node.js (v14.16.1 or later)
MongoDB (v4.1.1 or later)
Mongoose ( v6.7.0 or later)

Clone the repository:
git clone https://github.com/Dcapalbo/Mern-stack-webApp-fabrique-entertainment.git
search for the server folder and go into it.

Install dependencies:
npm install

Endpoints:
Contacts:

GET /contacts: Get all contacts
POST /contacts: Add a contact
PUT /contacts/:id: Edit a contact
DELETE /contacts/:id: Delete a single contact
Users:

POST /users: Create a user
POST /users/login: Login a user
POST /users/forgot-password: Forgot password
PUT /users/reset-password: Reset password
Films:

GET /films: Get all films
POST /films: Add a film
PUT /films/:id: Edit a film
DELETE /films/:id/:userId: Delete a single film using the film id and user id.
