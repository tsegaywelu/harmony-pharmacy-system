const News = require('../models/news');

exports.createNews = async (req, res) => {
  try {
    const { title, content, author } = req.body; // Extract data from request body
    const newNews = new News({ title, content, author }); // Create a new News instance

    await newNews.save(); // Save the news article to the database
    res.status(201).json({ message: 'News article created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating news article' });
  }
};

exports.getNews = async (req, res) => {
  try {
    const newsArticles = await News.find(); // Fetch all news articles from the database
    res.json({ data: newsArticles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news articles' });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const newsArticle = await News.findById(id); // Find news article by ID

    if (!newsArticle) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json({ data: newsArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news article' });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body; // Extract data for update

    const updatedNews = await News.findByIdAndUpdate(id, { title, content, author }, { new: true }); // Update the news article and return the updated document

    if (!updatedNews) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json({ message: 'News article updated successfully', data: updatedNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating news article' });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting news article' });
  }
};
