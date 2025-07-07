import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { BlogPost } from '../types';

// Mock blog data
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Guide to Helicopter Tours in New York City',
    slug: 'ultimate-guide-helicopter-tours-nyc',
    excerpt: 'Discover the best helicopter tour routes, optimal times to fly, and what to expect during your aerial adventure over the Big Apple.',
    content: '',
    author: 'Sarah Mitchell',
    publishedDate: new Date('2024-01-15'),
    featuredImage: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=800',
    categories: ['Tours', 'New York'],
    tags: ['helicopter tours', 'NYC', 'sightseeing', 'aerial photography'],
    published: true,
    readTime: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Safety First: Understanding Helicopter Safety Standards',
    slug: 'helicopter-safety-standards-guide',
    excerpt: 'Learn about the rigorous safety protocols, maintenance standards, and pilot certifications that ensure your helicopter experience is both thrilling and secure.',
    content: '',
    author: 'Captain Mike Johnson',
    publishedDate: new Date('2024-01-12'),
    featuredImage: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
    categories: ['Safety', 'Education'],
    tags: ['safety', 'maintenance', 'pilot training', 'regulations'],
    published: true,
    readTime: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Planning the Perfect Proposal: Helicopter Romance Ideas',
    slug: 'perfect-helicopter-proposal-ideas',
    excerpt: 'Make your proposal unforgettable with these romantic helicopter experience ideas, from sunset flights to custom routes over meaningful locations.',
    content: '',
    author: 'Emily Rodriguez',
    publishedDate: new Date('2024-01-10'),
    featuredImage: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=800',
    categories: ['Romance', 'Special Events'],
    tags: ['proposals', 'romance', 'special occasions', 'sunset flights'],
    published: true,
    readTime: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Business Aviation: Why Executives Choose Helicopter Travel',
    slug: 'business-aviation-executive-helicopter-travel',
    excerpt: 'Explore how helicopter travel is revolutionizing business transportation, offering time efficiency and exclusive access for corporate executives.',
    content: '',
    author: 'David Chen',
    publishedDate: new Date('2024-01-08'),
    featuredImage: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
    categories: ['Business', 'Executive Travel'],
    tags: ['business travel', 'executives', 'time efficiency', 'corporate'],
    published: true,
    readTime: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    title: 'Aerial Photography Tips for Your Helicopter Flight',
    slug: 'aerial-photography-tips-helicopter-flight',
    excerpt: 'Capture stunning aerial photographs during your helicopter tour with these professional tips on camera settings, composition, and timing.',
    content: '',
    author: 'Alex Thompson',
    publishedDate: new Date('2024-01-05'),
    featuredImage: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=800',
    categories: ['Photography', 'Tips'],
    tags: ['aerial photography', 'camera tips', 'composition', 'helicopter tours'],
    published: true,
    readTime: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    title: 'Seasonal Flying: Best Times for Helicopter Tours',
    slug: 'seasonal-flying-best-times-helicopter-tours',
    excerpt: 'Discover the optimal seasons and weather conditions for helicopter tours, including what to expect during different times of the year.',
    content: '',
    author: 'Maria Santos',
    publishedDate: new Date('2024-01-03'),
    featuredImage: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
    categories: ['Seasonal', 'Planning'],
    tags: ['seasonal flying', 'weather', 'tour planning', 'best times'],
    published: true,
    readTime: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const categories = ['All', 'Tours', 'Safety', 'Business', 'Romance', 'Photography', 'Planning'];

export const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      setBlogPosts(mockBlogPosts);
      setFilteredPosts(mockBlogPosts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || 
                             post.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [blogPosts, searchTerm, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-20">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Helicopter in flight"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6"
          >
            Aviation Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            Expert insights, safety tips, and inspiring stories from the world of luxury helicopter travel
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-100 text-navy-700 hover:bg-gold-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredPosts.length} of {blogPosts.length} articles
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or browse all categories
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} variant="outline">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  {/* Categories and Read Time */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-wrap gap-1">
                      {post.categories.slice(0, 2).map((category, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gold-100 text-gold-700 text-xs rounded-md font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime} min read
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-navy-900 mb-3 line-clamp-2 group-hover:text-gold-600 transition-colors duration-200">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.publishedDate.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 bg-navy-50 text-navy-600 text-xs rounded-md"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-gold-600 hover:text-gold-700 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && filteredPosts.length >= 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest aviation insights, safety tips, and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-navy-900 focus:ring-2 focus:ring-gold-500 focus:outline-none"
              />
              <Button variant="primary" size="lg">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};