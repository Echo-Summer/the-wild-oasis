// import styled from 'styled-components'

import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'

import useCabins from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import Empty from '../../ui/Empty'
import { sortByField } from '../../utils/helpers'

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `

function CabinTable() {
  const { cabins, error, isLoading } = useCabins()
  const [searchParams] = useSearchParams()

  // 需要先在 loading 和 error 阶段 return，再处理过滤：
  if (isLoading) return <Spinner />
  if (error) return <p>出错啦: {error.message}</p>

  if (!cabins || !cabins.length) return <Empty resourceName={'cabins'} />

  // 筛选：根据discount
  const filterValue = searchParams.get('discount') || 'all'
  let filterCabins

  if (filterValue === 'all') {
    filterCabins = cabins
  } else if (filterValue === 'no-discount') {
    filterCabins = cabins.filter((cabin) => cabin.discount === 0)
  } else if (filterValue === 'with-discount') {
    filterCabins = cabins.filter((cabin) => cabin.discount > 0)
  }

  // 排序
  const sortBy = searchParams.get('sortBy') || 'name-asc'
  const sortedCabins = sortByField(filterCabins, sortBy)
  // const [field, direction] = sortBy.split('-')
  // const modifier = direction === 'asc' ? 1 : -1
  // const sortedCabins = filterCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // )

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>小屋</div>
          <div>容量</div>
          <div>价格</div>
          <div>折扣</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={filterCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />

        {/* {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
       ))} */}
      </Table>
    </Menus>
  )
}

export default CabinTable
