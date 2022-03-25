const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  return blogs.reduce((favoriteBlog, blog) =>
    blog.likes > favoriteBlog.likes ? blog : favoriteBlog
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = [];

  blogs.forEach((blog) => {
    const authorIdx = authors.findIndex(
      (author) => blog.author === author.author
    );

    if (authorIdx === -1) {
      authors.push({ author: blog.author, blogs: 1 });
    } else {
      authors[authorIdx].blogs++;
    }
  });

  return authors.reduce((mostPublished, author) => {
    if (author.blogs > mostPublished.blogs) {
      return author;
    } else {
      return mostPublished;
    }
  });
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
