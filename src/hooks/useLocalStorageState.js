import { useState, useEffect } from 'react'

/**
 * 运行逻辑：（state 初始化 → localStorage 取值 → setValue 更新 → useEffect 保存）
 */
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialState
  })

  // 每当 value 或 key 发生变化，就把 value 存进 localStorage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value))
    },
    [value, key]
  )

  return [value, setValue]
}
