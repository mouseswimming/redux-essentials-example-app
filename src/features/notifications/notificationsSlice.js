import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

// all the content in the async function below is just to mock
// fake date with timestamp, it will not need in real app
export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    // when we fetch the notifications, we sorted so the latest is the first one.
    // use pattern below, we destructure the first from the array, which will be latest notification.
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`,
    )
    return response.data
  },
)

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const notificationsSlice = createSlice({
  name: 'notification',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach(
        (notification) => (notification.read = true),
      )
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload)
      Object.values(state.entities).forEach(
        (notification) => (notification.isNew = !notification.read),
      )
    })
  },
})

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state) => state.notifications)

export const { allNotificationsRead } = notificationsSlice.actions
export default notificationsSlice.reducer
