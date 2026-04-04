async function getPost(slug) {
  const res = await fetch(`https://news-saga.com/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 86400 }
  });
  const posts = await res.json();
  return posts[0];
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  const title = post?.title?.rendered || 'News Saga';
  const excerpt = post?.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '';
  const image = post?.jetpack_featured_media_url || '';

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: image ? [image] : [],
      url: `https://saga-plum.vercel.app/posts/${params.slug}`,
      siteName: 'News Saga',
      type: 'article',
    },
  };
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div style={{ padding: '20px' }}>Post not found</div>;
  }

  const image = post?.jetpack_featured_media_url || '';

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <a href="/" style={{ color: '#0070f3', fontSize: '14px' }}>Back to Home</a>

      {image && (
        <img src={image} alt="" style={{ width: '100%', borderRadius: '8px', margin: '20px 0' }} />
      )}

      <h1
        style={{ fontSize: '2rem', margin: '20px 0 10px' }}
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div
        style={{ fontSize: '16px', lineHeight: '1.7', color: '#333' }}
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
        
          href={post.link}
          target="_blank"
          style={{ color: '#0070f3', fontSize: '15px' }}
        >
          View original article on News Saga
        </a>
      </div>
    </main>
  );
}
