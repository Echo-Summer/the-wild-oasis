import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2'
import Stat from './Stat'
import { formatCurrency } from '../../utils/helpers'

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. 订单总数
  const numBookings = bookings.length

  // 2. 总销售额
  // acc 是累加器（accumulator），初始值为 0。
  // cur 是当前遍历到的订单对象。
  // acc + cur.totalPrice 表示把当前订单的 totalPrice 加到累加器上
  const sales = bookings.reduce((acc, cur) => {
    const t = Number(cur?.totalPrice) || 0
    const e = Number(cur?.extrasPrice) || 0
    return acc + t + e
  }, 0)

  // 3. 已入住数
  const checkins = confirmedStays.length

  // 4. 入住率 (所有订单入住总天数 / 酒店可提供的入住天数(如 7天 * 房间总数))
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount)

  return (
    <>
      <Stat
        title='订单'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='销售额'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='入住数'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />{' '}
      <Stat
        title='入住率'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  )
}

export default Stats
