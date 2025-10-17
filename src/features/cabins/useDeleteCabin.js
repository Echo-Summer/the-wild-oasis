import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'

export default function useDeleteCabin() {
  const queryClient = useQueryClient()

  //删除小屋数据
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('cabin successfully deleted')

      // 当你做了 删除/更新/新增 之后, 需要让某个缓存失效（invalidate）→ React Query 自动去重新 fetch。
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: (err) => toast.error(err.message),
  })

  return { isDeleting, deleteCabin }
}
