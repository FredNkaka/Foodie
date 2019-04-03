const mongoose = require('mongoose');
const recipesschema = mongoose.schema({

    id : string
    useid: string
    name: string
    manufacture: string
    description: string
    mainpepper: string
    image url: string
    heat: number
    likes: number
    dislikes: number
    usersliked: [string]
    usersdiliked: [string]
});
module.exports = mongoose.model('recipes', recipesschema);