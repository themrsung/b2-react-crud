import Post from '../shared/post'

const NewsfeedComponent = function ({ posts }) {
  return (
    <div className="NewsfeedComponent">
      {posts.map((post) => {
        return <Post post={post} />
      })}
    </div>
  )
}

export default NewsfeedComponent
