const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// POST => create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("POST adding users errors: ", errors.array());
      return res.status(422).json({
        user: {
          name,
          email,
          password,
        },
        message: "Validation errors are present",
        errorMessage: errors.array()[0].msg,
        validationErrors: errors.array(),
      });
    }

    // Check if user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "The user has already been registered",
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return success response with created user
    res.status(201).json({
      message: "The user has been created",
      user,
    });
  } catch (err) {
    // Handle errors
    console.error("Error creating user: ", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// POST => Login in the User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "The User doesn't exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        userId: existingUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    return res.status(200).json({
      message: "Login successful",
      result: existingUser,
      token,
      userId: existingUser._id,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//POST => forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "The user with this email does not exist",
      });
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const automaticEmailData = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Fabrique entertainment link per il reset della password",
      html: `
            <h2>Questo link ha validità di 5 minutiPer favore clicca sul link qui sotto per resettare la tua password,</h2>
            <a href="${process.env.CLIENT_LOCAL_URL}/reset-password?token=${token}">${token}</a>
        `,
    };

    await User.updateOne({ resetLink: token });
    transporter.sendMail(automaticEmailData, (err, info) => {
      if (err) {
        console.log("Here my reset password error: ", err);
        return;
      }
      return res.status(201).json({
        message:
          "The link for the password reset has been sent: " + info.response,
      });
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Was not possible to reset the password" });
  }
};

// PUT => reset password
exports.resetPassword = async (req, res) => {
  const { resetLink, password } = req.body;

  try {
    const existingResetLink = await User.findOne({ resetLink });

    if (!existingResetLink) {
      return res.status(400).json({
        message: "The reset link does not exist",
      });
    }

    jwt.verify(resetLink, process.env.JWT_SECRET, async (err) => {
      if (err) {
        return res.status(401).json({ message: "incorrect or expired token" });
      }

      // Hash password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 12);

      // Update user's password and reset link
      const updatedUser = await User.findOneAndUpdate(
        { resetLink },
        { password: hashedPassword, resetLink: "" },
        { new: true } // Return the updated document instead of the original
      );

      return res.status(201).json({
        message: "The password has been reset",
        user: updatedUser,
      });
    });
  } catch (error) {
    return res.status(409).json({ message: "Unable to reset password" });
  }
};
