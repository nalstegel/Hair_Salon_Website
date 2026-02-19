import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const BlogPost = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [post, setPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`)
        .then(res => setPost(res.data))
        .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div className="page-wrapper">...</div>;

  const title = (language === 'it' && post.title_it) ? post.title_it : post.title_sl;
  const content = (language === 'it' && post.content_it) ? post.content_it : post.content_sl;
  
  const backText = language === 'it' ? '← Torna al Blog' : '← Nazaj na Blog';
  const bookText = language === 'it' ? 'Prenota ora' : 'Rezervacija';
  const likeText = language === 'it' ? 'Ti è piaciuto l\'articolo?' : 'Vam je bil članek všeč?';

  return (
    <div className="page-wrapper bg-white">
      <article className="single-post-container">
        <div className="post-nav">
          <Link to="/blog" className="back-link">{backText}</Link>
        </div>

        <header className="post-header">
          <div className="post-meta">
            <span className="post-category">{post.category}</span>
            <span className="meta-separator">|</span>
            <span className="post-date">{post.date}</span>
          </div>
          <h1 className="post-title">{title}</h1>
        </header>

        <div className="post-hero-image-wrapper">
          <img src={post.image} alt={title} className="post-hero-image" />
        </div>

        <div className="post-content" dangerouslySetInnerHTML={{ __html: content }}></div>

        <div className="post-footer">
          <div className="section-divider"></div>
          <p>{likeText}</p>
          <Link to="/rezervacija" className="career-btn mt-20">{bookText}</Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;