require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');

const app = express();
const PORT = process.env.PORT ?? 3001;
const sequelize = new Sequelize(process.env.DB_URL);

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      blog.destroy();
    }
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
