import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)
    return response.data
  },
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePost(state, action) {
      const { id, title, content } = action.payload
      const post = state.entities[id]
      if (post) {
        post.title = title
        post.content = content
      }
    },
    updateReaction(state, action) {
      const { postId, reaction } = action.payload
      const post = state.entities[postId]

      if (post) {
        post.reactions[reaction]++
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload.message
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
})

// the state here is rootState, so it will need to find the slice posts first, then access its data posts.
// export const selectAllPosts = (state) => state.posts.posts
// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId)

// adapter has built-in selectors and we can use these to replace our hand-written ones.
// but since we already use these hand-written selector in other codes, we will rename those built-in method with ours to keep it clean and avoid changes.
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts)

export const selectPostByUserId = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId),
)

export const { addPost, updatePost, updateReaction } = postsSlice.actions
export default postsSlice.reducer
