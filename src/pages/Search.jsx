import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Search = function () {
  let navigate = useNavigate()

  const params = useParams()

  useEffect(() => {
    navigate('/searchresults/' + params.id)
  }, [])
  return <></>
}

export default Search
