const mongoose = require("mongoose");
const User = require("../model/user");
require("dotenv").config();

// Define the users to seed
const users = [
  {
    name: "Domenico",
    email: "capalbodomenico@gmail.com",
    password: "Domenico03",
  },
  {
    name: "Tiziano",
    email: "janedoe@example.com",
    password: "TiziScott",
  },
];

// Define the seeder function
const seedUsers = async () => {
  try {
    // Connect to the database
    mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Drop the existing users collection
    await User.collection.drop();

    // Insert the users into the database
    await User.insertMany(users);

    // Log success message
    console.log("Users seeded successfully!");
  } catch (err) {
    // Log error message
    console.error(err.message);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the seeder function
seedUsers();
