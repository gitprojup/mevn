var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    description: String,
    email: String,
    password: String,
    coupon: String,
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;