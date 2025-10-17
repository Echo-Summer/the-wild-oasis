import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export default function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  // filter
  const filterValue = searchParams.get('status')
  //  如果 URL 里没有 status，或者它是 "all"，那就说明 不过滤 → filter = null。
  // 否则构造一个对象：
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }

  // sort
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }

  //pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], // 当 filter 发生变化时（比如用户切换筛选条件），queryKey 也变了 → React Query 会自动重新执行请求。
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  // prefetching: 在用户真正发起请求之前，提前把数据请求并缓存好。
  // 等到用户真的需要时，可以 直接从缓存里取数据，而不是再等服务器返回。
  // 当用户在第 1 页时，可以 prefetch 第 2 页的数据。等用户点“下一页”，数据已经准备好了
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    })
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    })
  }

  return { bookings, error, isLoading, count }
}
