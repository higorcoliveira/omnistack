const Post = require('../model/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        await processImage(req, image);

        // save post
        const post = await Post.create({
            author, place, description, hashtags, image
        });

        // broadcast para todos os usuários
        req.io.emit('post', post);

        return res.json(post);
    }
};

// Redimensiona, renomeia e apaga a imagem
const processImage = async (req, image) => {
    const [name] = image.split('.');
    const fileName = `${name}.jpg`;
    await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(path.resolve(req.file.destination, 'resized', fileName));

    fs.unlinkSync(req.file.path);
}