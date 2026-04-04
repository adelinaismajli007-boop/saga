async function getPost(slug) {
  const res = await fetch(`https://news-saga.com/wp-json/wp/v2/posts?slug=${slug}&_embed`, { next: { revalidate: 86400 } });
  const posts = await res.json();
  return posts[0];
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  const title = post?.title?.rendered || 'News Saga';
  const excerpt = post?.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '';
  const image = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://news-saga.com/wp-content/uploads/logo.png';

  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      images: [{ url: image, width: 1200, height: 630 }],
      url: `https://saga-plum.vercel.app/posts/${params.slug}`,
      siteName: 'News Saga',
      type: 'article',
    },
  };
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);
  if (!post) return <div style={{padding:'20px'}}>Post not found</div>;
  return (
    <main style={{margin:'0',padding:'0',width:'100%',height:'100vh'}}>
      <iframe
        src={post.link}
        style={{width:'100%',height:'100vh',border:'none'}}
        title={post.title.rendered}
      />
    </main>
  );
}
