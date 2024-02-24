import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

export default function AddPostForm() {
  const titleRef = useRef()
  const contentRef = useRef()
  const userRef = useRef()

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const onSavePostHandler = async () => {
    if (addRequestStatus !== 'idle') return

    const title = titleRef.current.value
    const content = contentRef.current.value
    const user = userRef.current.value
    if (title && content) {
      try {
        setAddRequestStatus('pending')
        dispatch(
          addNewPost({
            title,
            content,
            user,
          }),
        ).unwrap()
        titleRef.current.value = ''
        contentRef.current.value = ''
        userRef.current.value = ''
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="postTitle">Post title</label>
        <input type="text" id="postTitle" ref={titleRef} required />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" ref={userRef} required>
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="postContent">Post content</label>
        <textarea type="text" id="postContent" ref={contentRef} required />
        <button type="button" onClick={onSavePostHandler}>
          Save Post
        </button>
      </form>
    </section>
  )
}
