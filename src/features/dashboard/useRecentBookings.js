import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { getBookingsAfterDate } from '../../services/apiBookings'

function useRecentBookings() {
  // 1. 获取URL查询参数
  const [searchParams] = useSearchParams()

  // 2. 确定要查询的天数
  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))

  // 3. 计算查询的起始日期
  //  .toISOString(): 转换为ISO字符串格式 (如: "2024-01-15T00:00:00.000Z")
  const queryDate = subDays(new Date(), numDays).toISOString()

  // 4. 使用React Query获取数据
  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${numDays}`],
  })

  return { bookings, isLoading }
}

export default useRecentBookings
