import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'
import TableOperations from '../../ui/TableOperations'

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={'discount'}
        options={[
          { value: 'all', label: '所有小屋' },
          { value: 'no-discount', label: '无折扣' },
          { value: 'with-discount', label: '有折扣' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: '根据名称排序(A-Z)' },
          { value: 'name-desc', label: '根据名称排序(Z-A)' },
          { value: 'regularPrice-asc', label: '根据价格排序(最低优先)' },
          { value: 'regularPrice-desc', label: '根据价格排序(最高优先)' },
          { value: 'maxCapacity-asc', label: '根据容量排序(最低优先)' },
          { value: 'maxCapacity-desc', label: '根据容量排序(最高优先)' },
        ]}
      />
    </TableOperations>
  )
}

export default CabinTableOperations
