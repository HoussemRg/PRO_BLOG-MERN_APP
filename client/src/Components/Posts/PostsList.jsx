import React from 'react'
import PostItem from './PostItem'

const PostsList = ({posts}) => {
  return (
    <div>
      {posts.map((post)=> <PostItem post={post} key={post._id} /> )}
    </div>
  )
}

export default PostsList
