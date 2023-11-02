const notFound = (req, res) => res.render('notFound.ejs', { session: req.session });

module.exports = notFound;
