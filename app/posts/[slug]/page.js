import { redirect } from 'next/navigation';

async function getPost(slug) {
  const res = await fetch(`https://news-saga.com/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 86400 }
  });
  const posts = await res.json();
  return posts[0];
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    redirect('https://news-saga.com');
  }

  redirect(post.link);
}
