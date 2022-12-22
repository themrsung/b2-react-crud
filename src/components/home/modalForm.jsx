import React from 'react'
import WritePostForm from '../home/writePostForm'

const ModalForm = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'OpenModal Modal' : 'Modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button
              id="CloseWritePostModalButton"
              style={{ cursor: 'pointer', border: 'none' }}
              onClick={close}
            >
              &times;
            </button>
          </header>

          <main>
            <WritePostForm />
          </main>
          {/* <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer> */}
        </section>
      ) : null}
    </div>
  )
}

export default ModalForm
