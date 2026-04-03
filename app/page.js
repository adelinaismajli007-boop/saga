async function getPosts() {
  const res = await fetch('https://news-saga.com/wp-json/wp/v2/posts?per_page=20', {
    next: { revalidate: 60 }
  });
  const posts = await res.json();
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>News Saga</h1>
      {posts.map((post) => (
        <div key={post.id} style={{ borderBottom: '1px solid #eee', marginBottom: '20px', paddingBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem' }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          <a href={`/posts/${post.slug}`} style={{ color: 'blue' }}>Read more →</a>
        </div>
      ))}
    </main>
  );
}
