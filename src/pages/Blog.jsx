import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext'; 

const Blog = () => {
  const { language } = useLanguage(); 
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/blog`)
      .then(res => {
        setBlogPosts(res.data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper bg-white">
      <section className="blog-header-section">
        <div className="blog-header-content">
          <h1 className="section-title">BLOG</h1>
        </div>
      </section>

      <section className="blog-posts-section">
        <div className="blog-grid">
          {blogPosts.map((post) => {
              const title = (language === 'it' && post.title_it) ? post.title_it : post.title_sl;
              const excerpt = (language === 'it' && post.excerpt_it) ? post.excerpt_it : post.excerpt_sl;

              return (
                <article key={post.id} className="blog-card">
                  <div className="blog-img-wrapper">
                    <Link to={`/blog/${post.id}`}>
                      <img src={post.image} alt={title} className="blog-img" />
                    </Link>
                    <span className="blog-category">{post.category}</span>
                  </div>

                  <div className="blog-content">
                    <span className="blog-date">{post.date}</span>
                    <h3 className="blog-title">
                      <Link to={`/blog/${post.id}`}>{title}</Link>
                    </h3>
                    <p className="blog-excerpt">{excerpt}</p>
                    
                    <Link to={`/blog/${post.id}`} className="blog-read-more">
                      {language === 'it' ? 'Leggi di più' : 'Preberi več'} <span className="arrow">→</span>
                    </Link>
                  </div>
                </article>
              );
          })}
        </div>
      </section>
    </div>
  );
};

export default Blog;