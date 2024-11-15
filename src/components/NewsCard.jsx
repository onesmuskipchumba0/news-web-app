const NewsCard = ({ article }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <img
          src={article.urlToImage || 'https://via.placeholder.com/400x200'}
          alt={article.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200'
          }}
        />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-news-dark text-white px-4 py-2 rounded-full 
              transition-all duration-300 
              hover:bg-blue-600 hover:shadow-lg 
              active:transform active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsCard 