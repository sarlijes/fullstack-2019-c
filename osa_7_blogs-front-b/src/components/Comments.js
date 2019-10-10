import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Comment = props => {

  const comment = useField('comment')

  if (props.blog.comments === undefined) return null

  const handleComment = () => {
    console.log('id: comment value:', props.blog.id, comment.value)
    props.addComment(props.blog.id, comment.value)
  }

  const comments = props.blog.comments.map(c => <li key={c.id}>{c.comment}</li>)

  return (
    <div>
      <h3>comments</h3>
      <input {...comment} />
      <button onClick={handleComment}>add comment</button>
      <ul>{comments}</ul>
    </div>
  )
}

const mapDispatchToProps = {
  addComment
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment)

export default ConnectedComment