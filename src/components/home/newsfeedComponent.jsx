import Post from '../shared/post'
import './style/homeComponents.css'

const NewsfeedComponent = function ({ posts }) {
  return (
    <div className="NewsfeedComponent">
      {posts
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((post) => {
          return <Post key={post.id} post={post} noModifyButtons={true} />
        })}
    </div>
  )
}

export default NewsfeedComponent
