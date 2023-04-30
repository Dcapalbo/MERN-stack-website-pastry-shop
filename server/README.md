Here's the updated README file based on the provided methods:

### Website Laura&Maria pastry RESTFULL API

### This is a RESTfull API for the pastry website Laura&Luana. It provides endpoints for managing sweets, and the users which can enter the back office area.

Getting Started
Prerequisites

### Node.js (v16.14.1 or later)

### MongoDB (v4.1.1 or later)

### Mongoose ( v6.7.0 or later)

Install dependencies:
### `npm install` (the node modules and packgage-lock.json will be created.)

database connection:

1.  ### A user, password, cluster and a database must be created on MongoDb Atlas, or an already existing one must be used.
2.  ### create a file .env, and write the following env variables inside of it:

    PORT=5000
    NODE_ENV=development
    MONGO_USER=YOURUSER
    MONGO_PASSWORD=YOURPASSWORD
    MONGO_DEFAULT_DATABASE=YOURDEFAULTDATABASE
    MONGO_CLUSTER=YOURMONGOCLUSTER
    JWT_SECRET=YOURJWTSECRET
    SMTP_EMAIL=YOURSMPTEMAIL
    SMTP_PASSWORD=YOURSMPTPASSWORD
    CLIENT_LOCAL_URL=http://localhost:3000

running application:

### `npm run start:dev` (running the application with nodemoon)

### `npm run start` (running the application without nodemoon)

There are 2 possibilities to scout the application:

1. ### making a user through the FE interface, doing a signUp with the informations asked from the form
2. ### running the seeders.

seeders:

to run the seeders, move inside the server folder and then run the following command:

### `node seeders/users.js` (for the users Luana & Maria)

### `node seeders/sweets.js` (for every sweets)

Endpoints:

Sweets:

### GET /get-sweets (Get all sweets)

### POST /add-sweet (Add a sweet)

### PUT /update-sweet (Edit a sweet)

### PUT /update-sweet-quantity (Update the quantity of a single sweet)

### DELETE /delete-sweet (Delete a single sweet)

Users:

### POST /sign-up (Create a user)

### POST /login (Login a user)

### POST /forgot-password (Forgot password link reset)

### PUT /reset-password: (Reset password)

The development team.
