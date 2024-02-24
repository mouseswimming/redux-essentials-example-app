import React from 'react'
import { useDispatch } from 'react-redux'
import { updateReaction } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export default function ReactionButtons({ postId, reactions }) {
  const dispatch = useDispatch()

  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
          <button
            key={name}
            type="button"
            className="muted-button reaction-button"
            onClick={() => dispatch(updateReaction({ postId, reaction: name }))}
          >
            {emoji} {reactions[name]}
          </button>
        )
      })}
    </div>
  )
}
