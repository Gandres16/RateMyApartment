const express = require("express");
const db = require("./db.js");
const cors = require("cors");

const app = express();

const PORT = 4000;
app.use(cors());
app.use(express.json());

//app.use(express.static("public"));
//app.use("/images", express.static("images"));

app.listen(PORT, () => {
console.log(`Server is running on ${PORT}`);
});

app.post("/signup", async (req, res) => {
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
        const { id, title, price, description, category, image, rating } = req.body;
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