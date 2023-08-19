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
                "url": count+1,
                "error": "",
            })
            return;
        }
        res.json({
            "url": shortUrl[0].url,
            "error": "",
        });
    }
    catch(err)
    {
        res.json({
            "error": "Server Error",
        })
    }
}

module.exports = getUrl;