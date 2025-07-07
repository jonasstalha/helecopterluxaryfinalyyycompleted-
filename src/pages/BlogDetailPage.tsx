import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Heart,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { BlogPost } from '../types';

// Mock blog post data
const mockBlogPost: BlogPost = {
  id: '1',
  title: 'The Ultimate Guide to Helicopter Tours in New York City',
  slug: 'ultimate-guide-helicopter-tours-nyc',
  excerpt: 'Discover the best helicopter tour routes, optimal times to fly, and what to expect during your aerial adventure over the Big Apple.',
  content: `
    <p>New York City from the air is a sight that never fails to amaze. Whether you're a first-time visitor or a lifelong resident, seeing the Big Apple from a helicopter offers a completely new perspective on this incredible metropolis.</p>

    <h2>Best Routes for NYC Helicopter Tours</h2>
    <p>There are several popular routes that showcase the best of New York City from above:</p>

    <h3>The Classic Manhattan Tour</h3>
    <p>This route takes you over the most iconic landmarks including the Statue of Liberty, Ellis Island, and the Manhattan skyline. You'll get breathtaking views of the Empire State Building, One World Trade Center, and Central Park.</p>

    <h3>The Brooklyn Bridge Experience</h3>
    <p>Flying over the Brooklyn Bridge offers stunning views of both Manhattan and Brooklyn. This route is particularly beautiful during sunset when the city lights begin to twinkle.</p>

    <h3>The Central Park Circuit</h3>
    <p>Perfect for seeing the contrast between urban development and green space, this route showcases Central Park's 843 acres surrounded by towering skyscrapers.</p>

    <h2>Best Times to Fly</h2>
    <p>The timing of your helicopter tour can significantly impact your experience:</p>

    <ul>
      <li><strong>Golden Hour:</strong> The hour before sunset provides the most dramatic lighting and stunning photographs.</li>
      <li><strong>Clear Weather:</strong> Visibility is crucial for helicopter tours. Check weather conditions before booking.</li>
      <li><strong>Weekdays:</strong> Less air traffic means smoother flights and better photo opportunities.</li>
    </ul>

    <h2>What to Expect During Your Flight</h2>
    <p>Your helicopter tour experience begins with a safety briefing and continues with professional narration throughout the flight. Our experienced pilots provide interesting facts and point out landmarks as you soar above the city.</p>

    <h3>Safety First</h3>
    <p>All our helicopters undergo rigorous maintenance checks, and our pilots are certified professionals with thousands of flight hours. Your safety is our top priority.</p>

    <h3>Photography Tips</h3>
    <p>To capture the best photos during your tour:</p>
    <ul>
      <li>Use a fast shutter speed to avoid blur</li>
      <li>Shoot through open windows when possible</li>
      <li>Focus on composition and leading lines</li>
      <li>Don't forget to enjoy the moment, not just photograph it</li>
    </ul>

    <h2>Booking Your NYC Helicopter Tour</h2>
    <p>Ready to experience New York City from above? Our fleet of luxury helicopters is ready to provide you with an unforgettable aerial adventure. Contact us today to book your tour and see the city that never sleeps from a whole new perspective.</p>
  `,
  author: 'Sarah Mitchell',
  publishedDate: new Date('2024-01-15'),
  featuredImage: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=1200',
  categories: ['Tours', 'New York'],
  tags: ['helicopter tours', 'NYC', 'sightseeing', 'aerial photography'],
  published: true,
  readTime: 8,
  createdAt: new Date(),
  updatedAt: new Date()
};

const relatedPosts = [
  {
    id: '2',
    title: 'Safety First: Understanding Helicopter Safety Standards',
    slug: 'helicopter-safety-standards-guide',
    featuredImage: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400',
    readTime: 6
  },
  {
    id: '3',
    title: 'Planning the Perfect Proposal: Helicopter Romance Ideas',
    slug: 'perfect-helicopter-proposal-ideas',
    featuredImage: 'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=400',
    readTime: 5
  }
];

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(42);

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      setBlogPost(mockBlogPost);
      setLoading(false);
    }, 1000);
  }, [slug]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const shareUrl = window.location.href;
  const shareTitle = blogPost?.title || '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Article Not Found</h2>
          <Link to="/blog">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-navy-600 hover:text-gold-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/blog" className="text-navy-600 hover:text-gold-600">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-navy-900 font-medium">{blogPost.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center text-navy-600 hover:text-gold-600 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blogPost.categories.map((category, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded-full font-medium"
              >
                {category}
              </span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-6"
          >
            {blogPost.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 text-gray-600 mb-6"
          >
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{blogPost.publishedDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{blogPost.readTime} min read</span>
            </div>
          </motion.div>

          {/* Social Share */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-between border-b border-gray-200 pb-6"
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
                <MessageCircle className="w-4 h-4" />
                <span>12</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">Share:</span>
              <a
                href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <img
            src={blogPost.featuredImage}
            alt={blogPost.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="border-t border-gray-200 pt-8 mb-12"
        >
          <h3 className="text-lg font-semibold text-navy-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 bg-navy-50 text-navy-600 text-sm rounded-lg hover:bg-navy-100 transition-colors duration-200 cursor-pointer"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-navy-900 mb-2">About {blogPost.author}</h3>
              <p className="text-gray-600 mb-4">
                Sarah is an aviation enthusiast and experienced helicopter pilot with over 10 years in the industry. 
                She specializes in luxury helicopter tours and has extensive knowledge of New York City's airspace and landmarks.
              </p>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">View Profile</Button>
                <Button variant="ghost" size="sm">Follow</Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h3 className="text-2xl font-bold text-navy-900 mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
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
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-gold-600 transition-colors duration-200">
                    {post.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime} min read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </article>

      {/* CTA Section */}
      <section className="bg-navy-900 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Experience NYC from Above?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Book your helicopter tour today and see the city that never sleeps from a whole new perspective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/helicopters">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-600">
                  Book Your Tour
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};