const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((favoriteBlog, blog) =>
    blog.likes > favoriteBlog.likes ? blog : favoriteBlog
  );
};

module.exports = { dummy, totalLikes, favoriteBlog };
