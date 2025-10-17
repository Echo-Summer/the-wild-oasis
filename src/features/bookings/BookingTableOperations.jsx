import SortBy from '../../ui/SortBy'
import Filter from '../../ui/Filter'
import TableOperations from '../../ui/TableOperations'

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='status'
        options={[
          { value: 'all', label: '所有' },
          { value: 'checked-out', label: '已退房' },
          { value: 'checked-in', label: '已入住' },
          { value: 'unconfirmed', label: '待入住' },
        ]}
      />

      <SortBy
        options={[
          { value: 'startDate-desc', label: '根据日期排序(从最近开始)' },
          { value: 'startDate-asc', label: '根据日期排序(从最早开始)' },
          {
            value: 'totalPrice-desc',
            label: '根据订单总价排序 (从最高开始)',
          },
          { value: 'totalPrice-asc', label: '根据订单总价排序 (从最低开始)' },
        ]}
      />
    </TableOperations>
  )
}

export default BookingTableOperations
