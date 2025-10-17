import { useQuery } from '@tanstack/react-query'
import { getCabins } from '../../services/apiCabins'

export default function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['cabins'], // 缓存的唯一标识
    queryFn: getCabins, // 请求函数
  })

  return { cabins, error, isLoading }
}
