async function getPost(slug) {
  const res = await fetch(`https://news-saga.com/wp-json/wp/v2/posts?slug=${slug}`, { next: { revalidate: 86400 } });
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
    openGraph: { title, description: excerpt, images: image ? [image] : [], siteName: 'News Saga', type: 'article' },
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
