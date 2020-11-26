const express = require("express"); //Expresshez
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

//* middleware
// app.use(logger);

//* Posthoz visszaküldeni amit kapott
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//*Routers-ben lévő members
app.use("/api/members", require("./routes/api/members"));

//* Beállítja az alap mappát a /public-ra
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Szerver started on port ${PORT}`));
