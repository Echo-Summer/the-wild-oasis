import { cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import styled from 'styled-components'
import useClickOutside from '../hooks/useClickOutside'

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`
//应用Compound Component Pattern👇

// 1. 创建一个上下文环境 context
const ModalContext = createContext()

// 2. 创建父组件, 上下文管理开关状态
function Modal({ children }) {
  const [openName, setOpenName] = useState('')

  const close = () => setOpenName('')
  const open = setOpenName

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  )
}

// 3. 子组件们共享状态
function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => open(opensWindowName) })
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext)
  // const ref = useRef()

  const ref = useClickOutside(close)
  // 将下面的功能封装到自定义的hook中，如上👆
  // useEffect(() => {
  //   function handleClickOutside(e) {
  //     // 如果点击不在 Modal 内部
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       close() // 调用关闭 modal逻辑
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside)
  //   // 清理事件监听
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [close])

  if (name !== openName) return null

  //Portal（传送门） 是 React 提供的把组件渲染到 父组件 DOM 树之外 的方式,
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* 任何作为 <Modal.Window> 的 children 的组件，都会自动获得一个额外的 prop：onCloseModal, onCloseModal 本质上就是 close()，即关闭当前 modal 的函数 */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body //将上面渲染的组件，放到了<body>里，而不是<div id='root'></div>
  )
}

// 4. 挂载子组件
Modal.Open = Open
Modal.Window = Window

export default Modal
