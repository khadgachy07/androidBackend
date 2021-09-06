const express = require('express');
const database = require('./database/database')
const bodyParser = require('body-parser');
const accountRoute = require('./routes/accountRoute');
const productRoute = require('./routes/productRoute');
const bookingRoute = require('./routes/bookingRoute')
const ratingRoute = require('./routes/ratingRoute');
const cors = require('cors')
const path = require("path")


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")))

app.use(cors())


app.use((req, res, next) => {
    console.log(req.body)
    next()
})

app.use("/api/account", accountRoute);
app.use("/api", productRoute);
app.use("/api", bookingRoute)
app.use("/api", ratingRoute);

app.listen(90);