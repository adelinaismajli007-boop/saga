async function getPost(slug) {
  const res = await fetch(`https://news-saga.com/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 60 }
  });
  const posts = await res.json();
  return posts[0];
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div style={{ padding: '20px' }}>Post not found</div>;
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <a href="/" style={{ color: 'blue' }}>← Back to Home</a>
      <h1 style={{ fontSize: '2rem', margin: '20px 0' }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </main>
  );
}
