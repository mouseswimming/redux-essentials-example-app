import { formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'

export default function PostAdded({ timestamp }) {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timeDistance = formatDistanceToNow(date)
    timeAgo = `${timeDistance} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
