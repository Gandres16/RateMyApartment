const express = require("express");
const db = require("./db.js");
const cors = require("cors");

// for login 
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const secretKey = process.env.JWT_SECRET_KEY;
const app = express();

let signedInUser = null;

const PORT = 4000;
app.use(cors());
app.use(express.json());

//app.use(express.static("public"));
//app.use("/images", express.static("images"));

app.listen(PORT, () => {
console.log(`Server is running on ${PORT}`);
});

app.post("/register", async (req, res) => {
    try {
        // Validate if body contains data
        if (!req.body || Object.keys(req.body).length === 0) {
            const msg = "POST:Bad request: No data provided.";
            console.log(msg);
            return res.status(400).send({ error: msg});
        }

        // Check if the table exists
        const [tableExists] = await db.query("SHOW TABLES LIKE 'users'");
        if (tableExists.length === 0) {
            const msg = "POST:Table does not exist";
            console.log(msg);
            return res.status(404).send({error:msg});
        }

        // Check if the email is already associated with an account
        const email = req.body.email;
        const password = req.body.password;
        const [userExists] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (userExists.length > 0) {
            // User exists
            const msg = "POST:User already exists";
            console.log(msg);
            return res.status(409).send({error:msg});
        }

        //TODO: Add validation for email and password

        // Proceed to add new user
        const insertSql = "INSERT INTO users (email, password) VALUES (?, ?)";
        const insertResult = await db.query(insertSql, [email, password])

        // success
        const msg = "POST:Success in Posting MySQL"+insertResult;
        console.log(msg);
        return res.status(200).send({success:msg});


    } catch (err) {
        // Handle any error
        const msg = "POST: An ERROR occurred in Post"+err;
        console.error(msg);
        res.status(500).send({error:msg});
    }
});

app.post("/login", async (req, res) => {
    try {
        // Validate if body contains data
        if (!req.body || Object.keys(req.body).length === 0) {
            const msg = "POST:Bad request: No data provided.";
            console.log(msg);
            return res.status(400).send({ error: msg});
        }

        // Check if the table exists
        const [tableExists] = await db.query("SHOW TABLES LIKE 'users'");
        if (tableExists.length === 0) {
            const msg = "POST:Table does not exist";
            console.log(msg);
            return res.status(404).send({error:msg});
        }

        const { email, password } = req.body;

        // Check if email is in database
        const [userExists] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (userExists.length < 1) {
            // User does not exist
            const msg = "POST:No user with that email exists";
            console.log(msg);
            return res.status(409).send({error:msg});
        }

        // Check if password is correct
        const [correctPassword] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
        if (correctPassword.length < 1) {
            // Password is incorrect
            const msg = "POST:Password is incorrect";
            console.log(msg);
            return res.status(409).send({error:msg});
        }

        const user = userExists[0];
        signedInUser = user.email;

        // Return token
        let msg = "POST:User registered successfully";
        console.log(msg);
        return res.status(200).send({success: msg, user: signedInUser});

    } catch (err) {
        // Handle any error
        const msg = "POST: An ERROR occurred in Post"+err;
        console.error(msg);
        res.status(500).send({error:msg});
    }
});

// app.get("/catalog/:id", async (req, res) => {
//     try {
//     // Read id from frontend
//     const id = req.params.id;
//     const query = "SELECT * FROM fakestore_catalog WHERE id = ?";
//     const [result] = await db.query(query, [id]); // Ensure to use array for parameters even if it's just one
//     console.log("Success in Reading MySQL");
//     res.status(200).send(result);
//     } catch (err) {
//     // If an error occurs, catch it and send an appropriate error response
//     console.error("Error in Reading MySQL :", err);
//     res.status(500).send({ error: 'An error occurred while fetching items.' });
//     }
//     });

app.get("/apartment/:name", async (req, res) => {
    try{
        const name = req.params.name;
        const query = "SELECT * FROM apartments WHERE name LIKE ?";
        const [result] = await db.query(query, [`%${name}%`]);
        console.log("Success in Reading MySQL");
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({error: "An error occurred"});
    }
});