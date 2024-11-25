"use strict";
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const bodyParser = require("body-parser"); // Import body-parser
const express = require("express");
require("dotenv").config();

const app = express();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the folder to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Save the file with a unique name
  },
});

// Initialize multer with storage engine
const upload = multer({ storage: storage });

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON bodies

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "admin_MinT",
  password: "1234",
  database: "employee_vacancy",
});

connection.connect((err) => {
  if (err) return console.error("Database connection error:", err.message);
  console.log("Connected to the MySQL server.");
});

// Route for creating Announcement table
app.post("/createJobTable", (req, res) => {
  let jobAnnouncement = `
    CREATE TABLE IF NOT EXISTS job_announcement (
      job_id INT PRIMARY KEY AUTO_INCREMENT,
      job_title VARCHAR(255) NOT NULL,
      job_type VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      job_experience VARCHAR(255) NOT NULL,
      job_salary VARCHAR(255) NOT NULL,
      job_qualifications_skills TEXT NOT NULL,
      job_description VARCHAR(255) NOT NULL,
      application_instructions TEXT NOT NULL,
      deadline VARCHAR(255) NOT NULL
    )
  `;

  connection.query(jobAnnouncement, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error creating table: " + err.message });
    }
    res
      .status(200)
      .json({ message: "Job announcement table created successfully." });
  });
});

// Route for adding a job announcement
app.post("/add-job-announcement", (req, res) => {
  const {
    job_title,
    job_type,
    location,
    job_experience,
    job_salary,
    job_qualifications_skills,
    job_description,
    application_instructions,
    deadline,
  } = req.body;
  // console.log(req.body);

  const sql = `INSERT INTO job_announcement (
      job_title,
      job_type,
      location,
      job_experience,
      job_salary,
      job_qualifications_skills,
      job_description,
      application_instructions,
      deadline
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Correct the parameter array in the query execution
  connection.query(
    sql,
    [
      job_title,
      job_type,
      location,
      job_experience,
      job_salary,
      job_qualifications_skills,
      job_description,
      application_instructions,
      new Date(deadline).toISOString(), // Format to 'YYYY-MM-DD'
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting value:", err.message); // Log detailed error on the server
        return res
          .status(500)
          .json({ message: "Error inserting value: " + err.message }); // Send error response to client
      }
      console.log("Value inserted successfully"); // Log success message
      res.status(201).json({ message: "Job announcement added successfully." }); // Send success response to client
    }
  );
});
app.get("/getData", (req, res) => {
  const data = `SELECT * FROM job_announcement`;
  connection.query(data, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving data:" + err.message });
    }
    // res.status(200).json(results);
    // let jobs = { jobAnnouncement: [] };
    // jobs.jobAnnouncement = results;
    // let stringJobs = JSON.stringify(jobs);
    // res.end(stringJobs);
    res.json(results);
    res.end();
  });
});

// DELETE endpoint to delete a user by ID
app.delete("/deletePost/:id", (req, res) => {
  const userId = parseInt(req.params.id, 10); // Convert userId to an integer
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID." }); // Handle invalid ID input
  }

  const deleteQuery = "DELETE FROM 	job_announcement WHERE job_id = ?";

  connection.query(deleteQuery, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err.message);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(200).json({ message: "User deleted successfully." });
    }
  });
});

//Create Personal Table
app.post("/create-users", (req, res) => {
  let personalInfo = `CREATE TABLE IF NOT EXISTS personal_info (
    personal_id int PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    date_of_birth VARCHAR(255) NOT NULL
  )`;

  let education = `CREATE TABLE IF NOT EXISTS education_info (
    education_id int PRIMARY KEY AUTO_INCREMENT,
    personal_id int,
    job_title VARCHAR(255) NOT NULL,
    degree_obtained VARCHAR(255) NOT NULL,
    field_study VARCHAR(255) NOT NULL,
    institution_name VARCHAR(255) NOT NULL,
    graduation_date VARCHAR(255) NOT NULL,
    FOREIGN KEY (personal_id) REFERENCES personal_info(personal_id)
  )`;

  let workExperience = `CREATE TABLE IF NOT EXISTS work_experience (
    experience_id int PRIMARY KEY AUTO_INCREMENT,
    personal_id int,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    start_date VARCHAR(255) NOT NULL,
    end_date VARCHAR(255) NOT NULL,
    job_description TEXT,
    cv VARCHAR(255) NOT NULL,
    FOREIGN KEY (personal_id) REFERENCES personal_info(personal_id)
  )`;

  connection.query(personalInfo, (err, result) => {
    if (err) return console.log(err);

    console.log("Personal info table created successfully");
  });

  connection.query(education, (err, result) => {
    if (err) return console.log(err);
    console.log("Education table created successfully");
  });

  connection.query(workExperience, (err, result) => {
    if (err) return console.log(err);
    console.log("Work experience table created successfully");
  });
  res.end("Tables created successfully");
});

// Your POST route with file upload handling
app.post("/accept-data", upload.single("cv"), (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    gender,
    date_of_birth,
    apply_for,
    degree_obtained,
    field_study,
    institution_name,
    graduation_date,
    job_title,
    company_name,
    start_date,
    end_date,
    job_description,
  } = req.body;

  // The file path for the uploaded CV
  const cvPath = req.file ? req.file.path : null;

  // SQL queries for inserting data
  const personalInfo = `INSERT INTO personal_info (
    first_name, last_name, email, phone_number, gender, date_of_birth, age, apply_for
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const educationInfo = `INSERT INTO education_info (
    personal_id, degree_obtained, field_study, institution_name, graduation_date
    )
    VALUES (?, ?, ?, ?, ?)`;

  const workExperience = `INSERT INTO work_experience (
    personal_id, job_title, company_name, start_date, end_date, experience_year, job_description, cv
    )
    VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

  // Calculate age from date of birth
  let dob = new Date(date_of_birth);
  let today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  if (age < 18) return;

  let startDate = new Date(start_date);
  let endDate = new Date(end_date);

  let experienceYear = endDate.getFullYear() - startDate.getFullYear();
  const monthExperience = endDate.getMonth() + startDate.getMonth();

  if (
    monthExperience < 0 ||
    (monthExperience === 0 && today.getDate() < dob.getDate())
  ) {
    experienceYear--;
  }

  if (experienceYear < 1) return;

  // Insert into personal_info table
  connection.query(
    personalInfo,
    [
      first_name,
      last_name,
      email,
      phone_number,
      gender,
      dob.toISOString(),
      age,
      apply_for,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting value:", err.message);
        return res
          .status(500)
          .json({ message: "Error inserting value: " + err.message });
      }

      console.log("Personal Information inserted successfully");
      const personalID = result.insertId;

      // Insert into education_info table
      connection.query(
        educationInfo,
        [
          personalID,
          degree_obtained,
          field_study,
          institution_name,
          graduation_date,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting value:", err.message);
            return res
              .status(500)
              .json({ message: "Error inserting value: " + err.message });
          }

          console.log("Education Information inserted successfully");

          // Insert into work_experience table
          connection.query(
            workExperience,
            [
              personalID,
              job_title,
              company_name,
              start_date,
              end_date,
              experienceYear,
              job_description,
              cvPath, // Save the file path in the database
            ],
            (err, result) => {
              if (err) {
                console.error("Error inserting value:", err.message);
                return res
                  .status(500)
                  .json({ message: "Error inserting value: " + err.message });
              }

              console.log("Work Experience inserted successfully");
              res.status(201).json({
                message:
                  "Personal, Education, and Work Experience Information added successfully.",
              });
            }
          );
        }
      );
    }
  );
});

app.post("/create-admin", function (req, res) {
  const admin = `
  CREATE TABLE IF NOT EXISTS admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'admin'
);
  `;

  connection.query(admin, function (err, result) {
    if (err) {
      console.error("Error creating admin table:", err.message);
      res
        .status(500)
        .json({ error: "An error occurred while creating the admin table." });
    } else {
      console.log("Admin table created successfully");
      res.status(200).json({ message: "Admin table created successfully." });
    }
  });
});

// Route to register admin
app.post("/register-admin", async (req, res) => {
  const { username, password, email } = req.body;

  // Basic validation
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // SQL query to insert new admin
    const createAdminQuery = `INSERT INTO admins (username, password, email) VALUES (?, ?, ?)`;

    // Execute the query
    connection.query(
      createAdminQuery,
      [username, hashedPassword, email],
      (err, result) => {
        if (err) {
          console.error("Error creating admin:", err.message);
          return res.status(500).json({ message: "Error creating admin" });
        }

        console.log("Admin created successfully");
        res.status(201).json({ message: "Admin created successfully" });
      }
    );
  } catch (err) {
    console.error("Error processing request:", err.message);
    res.status(500).json({ message: "Error processing request" });
  }
});

// Route to login admin
app.post("/login-admin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const findAdminQuery = `SELECT * FROM admins WHERE email = ?`;

  connection.query(findAdminQuery, [email], async (err, results) => {
    if (err) {
      console.error("Error fetching admin:", err.message);
      return res.status(500).json({ message: "Error fetching admin" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const admin = results[0];

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Optional: Create a JWT token for authentication
    // const token = jwt.sign({ id: admin.id }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({ ...admin, password: "" });
  });
});

app.get("/list-applicants", function (req, res) {
  const query = `
    SELECT * FROM personal_info pi
    JOIN work_experience we ON we.personal_id = pi.personal_id
    JOIN education_info ei ON ei.personal_id = pi.personal_id
  `;

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query:", err.message);
      return res.status(500).json({ message: "Error executing query" });
    }

    res.status(200).json(result);
  });
});

app.get("/download-cv/:id", (req, res) => {
  const personalId = parseInt(req.params.id, 10);

  if (isNaN(personalId)) {
    return res.status(400).json({ message: "Invalid applicant ID" });
  }

  const query = "SELECT cv FROM work_experience WHERE personal_id = ?";

  connection.query(query, [personalId], (err, result) => {
    if (err) {
      console.error("Error retrieving CV:", err.message);
      return res.status(500).json({ message: "Error retrieving CV" });
    }

    if (result.length === 0 || !result[0].cv) {
      return res
        .status(404)
        .json({ message: "CV not found for this applicant" });
    }

    const cvPath = result[0].cv;

    // Check if the file exists
    fs.access(cvPath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("CV file does not exist:", err.message);
        return res.status(404).json({ message: "CV file not found" });
      }

      // Send the file as a download
      res.download(cvPath, (err) => {
        if (err) {
          console.error("Error sending CV file:", err.message);
          return res.status(500).json({ message: "Error downloading CV" });
        }
      });
    });
  });
});

// API route to send an email
app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;
  // console.log(req.body);

  const mailOptions = {
    from: {
      name: "MinT",
      address: process.env.EMAIL_USER,
    },
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending email", error });
    }
    res.status(200).json({ message: "Email sent successfully" });
  });
});

// Update job announcement by ID
app.put("/update-job-announcement/:id", (req, res) => {
  const jobId = parseInt(req.params.id, 10); // Get job ID from URL
  const {
    job_title,
    job_type,
    location,
    job_experience,
    job_salary,
    job_qualifications_skills,
    job_description,
    application_instructions,
    deadline,
  } = req.body;

  const updateQuery = `
    UPDATE job_announcement
    SET job_title = ?, job_type = ?, location = ?, job_experience = ?, 
        job_salary = ?, job_qualifications_skills = ?, job_description = ?, 
        application_instructions = ?, deadline = ?
    WHERE job_id = ?`;

  connection.query(
    updateQuery,
    [
      job_title,
      job_type,
      location,
      job_experience,
      job_salary,
      job_qualifications_skills,
      job_description,
      application_instructions,
      new Date(deadline).toISOString(), // Format deadline to YYYY-MM-DD
      jobId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating job announcement:", err.message);
        return res
          .status(500)
          .json({ message: "Error updating job announcement: " + err.message });
      }
      res
        .status(200)
        .json({ message: "Job announcement updated successfully." });
    }
  );
});

// Update admin details by ID
app.put("/update-admin/:id", async (req, res) => {
  const adminId = parseInt(req.params.id, 10); // Get admin ID from URL
  const { username, password, email } = req.body;

  if (!username || !email) {
    return res
      .status(400)
      .json({ message: "Username and email are required." });
  }

  try {
    // Hash the password if provided
    let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const updateAdminQuery = `
      UPDATE admins
      SET username = ?, email = ? ${hashedPassword ? ", password = ?" : ""}
      WHERE admin_id = ?`;

    // Handle the query differently based on whether password is being updated
    const queryParams = hashedPassword
      ? [username, email, hashedPassword, adminId]
      : [username, email, adminId];

    connection.query(updateAdminQuery, queryParams, (err, result) => {
      if (err) {
        console.error("Error updating admin:", err.message);
        return res
          .status(500)
          .json({ message: "Error updating admin: " + err.message });
      }

      res.status(200).json({ message: "Admin details updated successfully." });
    });
  } catch (err) {
    console.error("Error processing request:", err.message);
    res.status(500).json({ message: "Error processing request." });
  }
});

// Delete admin by ID
app.delete("/delete-admin/:id", (req, res) => {
  const adminId = parseInt(req.params.id, 10);

  if (isNaN(adminId)) {
    return res.status(400).json({ message: "Invalid admin ID." });
  }

  const deleteAdminQuery = "DELETE FROM admins WHERE admin_id = ?";

  connection.query(deleteAdminQuery, [adminId], (err, result) => {
    if (err) {
      console.error("Error deleting admin:", err.message);
      return res
        .status(500)
        .json({ message: "Error deleting admin: " + err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json({ message: "Admin deleted successfully." });
  });
});

// Get the list of registered admins
app.get("/list-admins", (req, res) => {
  const query = "SELECT admin_id, username, email, role FROM admins";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching admins:", err.message);
      return res.status(500).json({ message: "Error fetching admins." });
    }

    res.status(200).json(results);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const port = 1234;
app.listen(port, (err) => {
  if (err) return console.error("Server error:", err.message);
  console.log(`Server is running on port ${port}`);
});
