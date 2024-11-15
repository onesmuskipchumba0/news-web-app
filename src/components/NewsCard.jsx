const NewsCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={article.urlToImage || 'https://via.placeholder.com/400x200'}
        alt={article.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x200'
        }}
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-news-dark text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-200"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsCard 