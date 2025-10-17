import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { updateCurrentUser } from '../../services/apiAuth'

export default function useUpdateUser() {
  // update user
  const queryClient = useQueryClient()

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success('User account successfully updated')
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },

    onError: (err) => {
      // 输出完整的错误信息到控制台
      console.error('更新用户错误:', err)
      console.error('错误详情:', {
        message: err.message,
        status: err.status,
        details: err,
      })
      toast.error(err.message)
    },
  })

  return { updateUser, isUpdating }
}
