import { redirect } from 'next/navigation';

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

  redirect(post.link);
}
