import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './components/NewsCard';
import { NewsLogo } from './assets/news-logo';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        );
        setNews(response.data.articles);
        setSearchResults([]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, API_KEY]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`
      );
      setSearchResults(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error searching news:', error);
      setLoading(false);
    }
  };

  const categories = [
    'general',
    'business',
    'technology',
    'sports',
    'entertainment',
    'health',
    'science',
  ];

  const displayedNews = searchResults.length > 0 ? searchResults : news;

  return (
    <div className="min-h-screen bg-news-light">
      <header className="bg-news-dark text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <NewsLogo />
              <h1 className="text-3xl font-bold">NewsHub</h1>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex w-full md:w-auto"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news..."
                className="px-4 py-2 rounded-l-full text-gray-800 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-r-full transition-colors duration-200"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {searchResults.length === 0 && (
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full capitalize ${
                  category === cat
                    ? 'bg-news-dark text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Found {searchResults.length} results for "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchResults([]);
                setSearchQuery('');
              }}
              className="mt-2 text-blue-600 hover:text-blue-800 underline"
            >
              Clear search
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-news-dark"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNews.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;