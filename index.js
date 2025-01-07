const express = require('express');
const path = require('path');
const {connecttoDatabase} = require('./connection')
const app = express();
const port = 8001;
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter'); 
const URL = require('./models/url');

connecttoDatabase('mongodb://localhost:27017/short-url').then(() =>console.log("MongoDb successfully connected"))
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.use("/url",urlRoute);
app.use('/',staticRoute);

app.get('/test', async(req, res) =>{
    const allURLS = await URL.find({});
    return res.render("home",{
        url: allURLS
    });

})
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
    if (!entry) {
        return res.status(404).send('Short URL not found');
    }
    res.redirect(entry.redirectURL);
})
app.listen(port,console.log(`server listening on port ${port}`));