import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost } from './postsSlice'
import { useHistory } from 'react-router-dom'

export default function EditPostForm({ match }) {
  const { postId } = match.params
  const post = useSelector((state) => selectPostById(state, postId))

  const titleRef = useRef()
  const contentRef = useRef()

  const dispatch = useDispatch()
  const history = useHistory()

  const onUpdatePostHandle = () => {
    const title = titleRef.current.value
    const content = contentRef.current.value

    if (title && content) {
      dispatch(updatePost({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          ref={titleRef}
          defaultValue={post.title}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          ref={contentRef}
          defaultValue={post.content}
        />
      </form>
      <button type="button" onClick={onUpdatePostHandle}>
        Update Post
      </button>
    </section>
  )
}
