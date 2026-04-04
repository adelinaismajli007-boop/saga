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
  const image = post?.jetpack_featured_media_url || 'https://news-saga.com/wp-content/uploads/logo.png';

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: [image],
      url: `https://saga-plum.vercel.app/posts/${params.slug}`,
      siteName: 'News Saga',
      type: 'article',
    },
  };
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${post.link}`} />
      </head>
      <body>
        <p>Redirecting... <a href={post.link}>Click here if not redirected</a></p>
      </body>
    </html>
  );
}
