const homePage = (req, res) => {
    res.render('home.ejs', { session: req.session });
};

module.exports = { homePage };
