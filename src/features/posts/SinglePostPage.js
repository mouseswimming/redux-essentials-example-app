import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import PostAuthor from './PostAuthor'
import PostAdded from './PostAdded'
import ReactionButtons from './ReactionButtons'
import { selectPostById } from './postsSlice'

export default function SinglePostPage({ match }) {
  const { postId } = match.params
  const post = useSelector((state) => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.userId} />
          <PostAdded timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>

        <ReactionButtons postId={post.id} reactions={post.reactions} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit post
        </Link>
      </article>
    </section>
  )
}
