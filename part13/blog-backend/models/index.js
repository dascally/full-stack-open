const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_list');
const ReadingListContents = require('./reading_list_contents');

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(ReadingList, { through: ReadingListContents });
ReadingList.belongsToMany(Blog, { through: ReadingListContents });

module.exports = {
  Blog,
  User,
  ReadingList,
  ReadingListContents,
};
