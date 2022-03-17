const {Article, Comment, Reply} = require('../models');

module.exports.renderAddForm = function(req, res){
    const article = {
        title: '',
        intro: '',
        image_url: '',
        body: '',
    };
    res.render('articles/add', {article});
};

module.exports.addArticle = async function(req, res){
    await Article.create({
        title: req.body.title,
        intro: req.body.intro,
        image_url: req.body.image_url,
        body: req.body.body,
        author_id: 1,
        published_on: new Date()
    })
    res.redirect('/');
}

module.exports.displayArticle = async function(req, res){
    const article = await Article.findByPk(req.params.articleId, {
        include: ['author']
    });
    res.render('articles/view', {article});
};
