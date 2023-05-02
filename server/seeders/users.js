const User = require("../model/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Define the users to seed
const users = [
  {
    name: "Luana",
    email: "emailallaqualesihaaccesso",
    password: "lapassword",
  },
  {
    name: "Maria",
    email: "emailallaqualesihaaccesso",
    password: "lasecondapassword",
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

    // Hash the passwords
    const saltRounds = 10;
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert the hashed users into the database
    await User.insertMany(hashedUsers);

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
