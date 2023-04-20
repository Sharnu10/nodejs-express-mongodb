const express = require('express');
const cors = require('cors');
const app = express();

let corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to DB');
})
.catch((error)=> {
    console.log("cannot connect to DB! ", error);
    process.exit();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application."});
});


require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});


