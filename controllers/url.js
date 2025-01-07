const shortid = require('shortid');

const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.URL) return res.status(400).json({error:'URL is required'});

    const shortID = shortid.generate();
    
    await URL.create({
        shortId:shortID,
        redirectURL:body.URL,
        visitHistory:[],
    });

    // return res.status(200).json({id:shortID});
    return res.render("home",{
        id:shortID,
    })
};

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortID;
    const result = await URL.findOne({shortId});
    
    return res.json({totalClicks: result.visitHistory.length,analytics: result.visitHistory});
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}