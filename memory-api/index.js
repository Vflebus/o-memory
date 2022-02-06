require("dotenv").config();

const express = require('express');
var cors = require('cors');
const router = require("./router");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}`);
});

