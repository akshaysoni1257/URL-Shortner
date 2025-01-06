const express = require('express');
const {connecttoDatabase} = require('./connection')
const app = express();
const port = 8001;
const urlRoute = require('./routes/url')
const URL = require('./models/url');

connecttoDatabase('mongodb://localhost:27017/short-url').then(() =>console.log("MongoDb successfully connected"))
app.use(express.json());

app.use("/url",urlRoute);


app.get('/:shortId', async (req, res) =>{
    const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate(
    {
        shortId
    },
    {
        $push:{
            visitHistory:{timestamp: Date.now()}
        }
    });
    res.redirect(entry.redirectURL);
})
app.listen(port,console.log(`server listening on port ${port}`));