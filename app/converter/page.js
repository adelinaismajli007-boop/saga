'use client';
import { useState } from 'react';

export default function Converter() {
  const [input, setInput] = useState('');
  const [vercelLink, setVercelLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function convert() {
    setVercelLink('');
    setError('');

    if (!input) {
      setError('Please paste a WordPress article URL first.');
      return;
    }

    try {
      const url = new URL(input);
      const parts = url.pathname.replace(/\/$/, '').split('/');

      if (parts.includes('archives')) {
        const postId = parts[parts.length - 1];
        setLoading(true);
        const res = await fetch('https://news-saga.com/wp-json/wp/v2/posts/' + postId);
        setLoading(false);
        if (!res.ok) {
          setError('Could not find this article. Please check the URL.');
          return;
        }
        const post = await res.json();
        setVercelLink('https://saga-plum.vercel.app/posts/' + post.slug);
      } else {
        const slug = parts[parts.length - 1];
        if (!slug) {
          setError('Could not detect the article slug.');
          return;
        }
        setVercelLink('https://saga-plum.vercel.app/posts/' + slug);
      }
    } catch (e) {
      setLoading(false);
      setError('Invalid URL. Please paste a full URL.');
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(vercelLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Link Converter</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Paste a News Saga article link and get the Vercel share link.</p>

      <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '6px' }}>WordPress article URL</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && convert()}
        placeholder="https://news-saga.com/your-article or /archives/12345"
        style={{ width: '100%', padding: '10px', fontSize: '15px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box', marginBottom: '12px' }}
      />

      <button
        onClick={convert}
        style={{ width: '100%', padding: '12px', fontSize: '15px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Convert →
      </button>

      {loading && (
        <p style={{ marginTop: '16px', textAlign: 'center', color: '#666', fontSize: '14px' }}>Looking up article...</p>
      )}

      {vercelLink && (
        <div style={{ marginTop: '24px', background: '#f5f5f5', borderRadius: '8px', padding: '16px' }}>
          <p style={{ fontSize: '13px', color: '#666', margin: '0 0 6px' }}>Your Vercel link</p>
          <p style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 12px', wordBreak: 'break-all' }}>{vercelLink}</p>
          <button
            onClick={copyLink}
            style={{ width: '100%', padding: '10px', fontSize: '14px', background: 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}
          >
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '12px', background: '#fff0f0', borderRadius: '8px', padding: '12px' }}>
          <p style={{ fontSize: '13px', color: 'red', margin: '0' }}>{error}</p>
        </div>
      )}
    </main>
  );
}
