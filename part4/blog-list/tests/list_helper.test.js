const listHelper = require('../utils/list_helper.js');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes([blogs[0]])).toBe(7);
  });

  test('of a bigger list is calculated correctly', () => {
    expect(listHelper.totalLikes(blogs.slice(0, 2))).toBe(12);
  });
});

describe('favoriteBlog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test('of single-entry list is that entry', () => {
    expect(listHelper.favoriteBlog(blogs.slice(0, 1))).toEqual(blogs[0]);
  });

  test('of multiple blogs is that with most likes', () => {
    const mostLikedBlog = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    };

    expect(listHelper.favoriteBlog(blogs)).toEqual(mostLikedBlog);
  });
});

describe('mostBlogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test("of single blog is that blog's author at 1 blog", () => {
    expect(listHelper.mostBlogs(blogs.slice(0, 1))).toEqual({
      author: 'Michael Chan',
      blogs: 1,
    });
  });

  test('of multiple blogs is author with most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('mostLikes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null);
  });

  test("of single blog is that blog's author/likes", () => {
    expect(listHelper.mostLikes(blogs.slice(0, 1))).toEqual({
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('of multiple blogs is author with most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
