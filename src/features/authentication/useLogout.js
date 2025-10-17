import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logoutApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(['user']) // 清空用户缓存
      toast.success('Log out successfully')
      navigate('/login', { replace: true })
    },
  })

  return { logout, isLoading }
}

export default useLogout
