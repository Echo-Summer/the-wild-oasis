import BookingRow from './BookingRow'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import useBookings from './useBookings'
import Empty from '../../ui/Empty'
import Spinner from '../../ui/Spinner'
import Pagination from '../../ui/Pagination'

function BookingTable() {
  const { bookings, isLoading, error, count } = useBookings()

  if (isLoading) return <Spinner />
  if (error) return <p>出错了： {error.message}</p>

  if (!bookings || !bookings.length) return <Empty resourceName={'bookings'} />

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>小屋</div>
          <div>客人</div>
          <div>日期</div>
          <div>状态</div>
          <div>总价</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default BookingTable
