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