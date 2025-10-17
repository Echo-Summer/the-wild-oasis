import styled from 'styled-components'
import useUser from '../features/authentication/useUser'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  // 1.拿到已认证的用户信息
  const { isLoading, isAuthenticated } = useUser()

  // 2.如果没有已认证的用户，则重定向到login页面
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate('/login')
      }
    },
    [isAuthenticated, isLoading, navigate]
  )

  // 3. loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  // 4. 如果确实有用户，则渲染app
  if (isAuthenticated) return children
}

export default ProtectedRoute
