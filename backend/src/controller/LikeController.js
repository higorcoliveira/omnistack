const Post = require('../model/Post');

module.exports = {   
    async store(req, res) {
       const post = await Post.findById(req.params.id);

       post.likes += 1;
       await post.save();
       // broadcast para todos os usuários
       req.io.emit('like', post);

       return res.json(post);
    }
};