const url = require('../models/urlModel.js');

const getUrl = async (req, res) => {
    const link = req.body.link;
    try {
        const shortUrl = await url.find({link: link}, {url: 1});

        if(shortUrl.length === 0)
        {
            const count = await url.find({}).then(
                (count) => count.length
            );
            const newUrl = new url({
                link: link,
                url: count+1
            })
            await newUrl.save();
            res.json({
                "url": count+1
            })
            return;
        }
        res.json({
            "url": shortUrl[0].url,
        });
    }
    catch(err)
    {
        res.json({
            "error": "Server Error",
        })
    }
}

const goToUrl = async (req, res) => {
    const shortUrl = req.params.url;

    try {
        const link = await url.find({url: shortUrl}, {link: 1});

        if(!link.length)
            return res.status(404).type("txt").send("Not Found");
        console.log(`redirecting to ${link[0]['link']}`);
        res.redirect(link[0]['link']);
    } catch (err) {
        res.status(404).type("txt").send("Not Found");
    }
}

module.exports = {getUrl, goToUrl};