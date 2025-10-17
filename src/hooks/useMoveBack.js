import { useNavigate } from 'react-router-dom'

/**
 * 调用 useNavigate()，得到一个 navigate 函数。
    * navigate(path) → 跳到指定路径。
    * navigate(-1) → 相当于浏览器的 “后退一步”。
    * navigate(1) → 相当于 “前进一步”。
 
 * 返回一个函数
    * 这个函数就是 () => navigate(-1)。 // 当你调用它时，会让浏览器回到上一页。
 */

export function useMoveBack() {
  const navigate = useNavigate()
  return () => navigate(-1)
}
