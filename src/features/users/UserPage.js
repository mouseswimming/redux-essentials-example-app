import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectPostByUserId } from '../posts/postsSlice'
import { Link } from 'react-router-dom'

export default function UserPage({ match }) {
  const { userId } = match.params
  const user = useSelector((state) => selectUserById(state, userId))

  if (!user) return <h2>User not found</h2>
  const postsByUser = useSelector((state) => selectPostByUserId(state, userId))

  return (
    <section>
      <h2>Post by {user.name}</h2>
      <ul>
        {postsByUser.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
