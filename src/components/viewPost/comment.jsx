const Comment = ({ comment }) => {
  return (
    <div>
      <p>{comment.content}</p>
      <p>
        by {comment.author} at {comment.createdAt}
      </p>
    </div>
  )
}

export default Comment
