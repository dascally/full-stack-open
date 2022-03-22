require('dotenv').config();

module.exports.PORT = process.env.PORT ?? 3003;
module.exports.MONGODB_URI = process.env.MONGODB_URI;
