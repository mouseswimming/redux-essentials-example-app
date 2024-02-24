import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import {
  selectAllNotifications,
  allNotificationsRead,
} from './notificationsSlice'
import { formatDistanceToNow, parseISO } from 'date-fns'

export default function NotificationsList() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const notifications = useSelector(selectAllNotifications)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  return (
    <section>
      <h2>Notifications</h2>
      {notifications.map((notification) => {
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const user =
          users.find((user) => user.id === notification.user)?.name ||
          'unkown user'

        return (
          <div
            className={`notification ${notification.isNew ? 'new' : ''}`}
            key={notification.id}
          >
            <div>
              <b>{user}</b> {notification.message}
            </div>
            <div title={notification.date}>
              <i>{timeAgo} ago</i>
            </div>
          </div>
        )
      })}
    </section>
  )
}
