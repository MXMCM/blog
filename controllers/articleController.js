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
module.exports.displayAll = async function (req,res){
    const articles = await Article.findAll({
        include: ['author']
    });
    res.render('articles/viewAll', {articles});
};
module.exports.renderEditForm = async function(req,res){
    const article = await Article.findByPk(req.params.articleId);
    res.render('articles/edit', {article});
};
module.exports.updateArticle = async function(req,res){
    await Article.update({
        title: req.body.title,
        intro: req.body.intro,
        image_url: req.body.image_url,
        body: req.body.body,
    },{
        where: {
            id: req.params.articleId
        }
    });
    res.redirect(`/article/${req.params.articleId}`);
}
module.exports.deleteAricle = async function(req,res){
    await Article.destroy({
        where: {
            id: req.params.articleId
        }
    });
    res.redirect('/')
};