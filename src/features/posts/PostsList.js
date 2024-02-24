import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import PostAdded from './PostAdded'
import ReactionButtons from './ReactionButtons'
import { Spinner } from '../../components/Spinner'
import { fetchPosts, selectPostById, selectPostIds } from './postsSlice'
import { useEffect } from 'react'

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <PostAdded timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons postId={post.id} reactions={post.reactions} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

export default function PostsList() {
  const dispatch = useDispatch()

  const orderedPostIds = useSelector(selectPostIds)

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  if (postStatus === 'pending') return <Spinner text="Loading..." />
  if (postStatus === 'failed') return <div>error</div>

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {orderedPostIds.map((postId) => (
        <PostExcerpt postId={postId} key={postId} />
      ))}
    </section>
  )
}
