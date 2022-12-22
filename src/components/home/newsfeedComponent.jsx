import Post from '../shared/post'

const NewsfeedComponent = function ({ posts }) {
  const newsfeedStyle = {}

  return (
    <div className="NewsfeedComponent" style={newsfeedStyle}>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </div>
  )
}

export default NewsfeedComponent
