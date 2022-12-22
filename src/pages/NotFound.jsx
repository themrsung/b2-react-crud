import logo from '../not-found.svg'
import './style/NotFound.css'

const NotFound = function () {
  return (
    <div className="NotFound">
      <div className="NotFoundLeft">
        <img className="NotFoundLogo" src={logo} alt="Page not found"></img>
        <h3>페이지를 찾을 수 없습니다. 더 열심히 찾아보세요ㅋㅋ</h3>
      </div>
    </div>
  )
}

export default NotFound
