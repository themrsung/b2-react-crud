import Post from '../shared/post'

const NewsfeedComponent = function ({ posts }) {
  const newsfeedStyle = {}

  return (
    <div className="NewsfeedComponent" style={newsfeedStyle}>
      {posts
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((post) => {
          return <Post key={post.id} post={post} noModifyButtons={true} />
        })}
    </div>
  )
}

export default NewsfeedComponent
