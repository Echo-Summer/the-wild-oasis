import { useEffect, useRef } from 'react'

function useClickOutside(handler, listenCapturing = true) {
  const ref = useRef()

  useEffect(() => {
    function handleClickOutside(e) {
      // 如果点击不在 Modal 内部
      if (ref.current && !ref.current.contains(e.target)) {
        handler() // 调用关闭 modal逻辑
      }
    }

    // addEventListener 的第三个参数（默认是 false）
    // 它决定了事件是在 捕获阶段 (capturing) 还是 冒泡阶段 (bubbling) 触发
    document.addEventListener('click', handleClickOutside, listenCapturing)
    // 清理事件监听
    return () => {
      document.removeEventListener('click', handleClickOutside, listenCapturing)
    }
  }, [handler, listenCapturing])

  return ref
}

export default useClickOutside
