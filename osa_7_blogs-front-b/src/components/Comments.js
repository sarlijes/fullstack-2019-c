import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Comment = props => {
  if (props.blog.comments === undefined) return null

  const comment = useField('comment')
  const handleComment = () => {
    // console.log('id: comment value:', props.blog.id, comment.value)
    props.addComment(props.blog.id, comment.value)
    comment.reset()
  }

  // const omitReset = (hook) => {
  //   let { reset, ...hookWithoutReset } = hook
  //   return hookWithoutReset
  // }

  const comments = props.blog.comments.map(c => <li key={c.id}>{c.comment}</li>)

  return (
    <div>
      <h3>comments</h3>
      <input id="commentInput"{ ...comment } />
      <button id="addComment" onClick={handleComment}>add comment</button>
      <ul>{comments}</ul>
    </div>
  )
}

const mapDispatchToProps = {
  addComment
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment)

export default ConnectedComment