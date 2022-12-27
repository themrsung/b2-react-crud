import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NewsfeedComponent from '../components/home/newsfeedComponent'
import { SERVER_URL } from '../serverUrl'
import './style/SearchResults.css'

export default function SearchResults() {
  const params = useParams()
  const [searchKeyword, setSearchKeyword] = useState(params.id)

  const [posts, setPosts] = useState([])
  const [searchedPosts, setSearchedPosts] = useState([])

  const fetchPosts = async function () {
    const response = await axios.get(SERVER_URL + '/posts')
    setPosts(response.data)
  }

  const fetchMathingPosts = async function () {
    await fetchPosts()
    const postsContainingKeyword = posts.filter((post) =>
      post.content.includes(searchKeyword)
    )
    console.log(postsContainingKeyword)
    setSearchedPosts(postsContainingKeyword)

    setFetchMatchingPostsCounter(fetchMathingPostsCounter + 1)
    setDummyStateBoolean(!dummyStateBoolean)
  }

  const [dummyStateBoolean, setDummyStateBoolean] = useState(false)
  const [fetchMathingPostsCounter, setFetchMatchingPostsCounter] = useState(0)

  useEffect(() => {
    if (fetchMathingPostsCounter < 50) {
      fetchMathingPosts()
    }
  }, [dummyStateBoolean])

  return (
    <div className="SearchResults">
      {searchedPosts.length > 0 ? (
        <NewsfeedComponent posts={searchedPosts} />
      ) : (
        <h2 style={{ width: '100%', textAlign: 'center' }}>
          검색 결과가 없습니다. 더 열심히 찾아보세요ㅋ
        </h2>
      )}
    </div>
  )
}
