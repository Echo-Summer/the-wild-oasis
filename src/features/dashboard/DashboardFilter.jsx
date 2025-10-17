import Filter from '../../ui/Filter'

function DashboardFilter() {
  return (
    <Filter
      filterField='last'
      options={[
        { value: '7', label: '过去7天' },
        { value: '30', label: '过去30天' },
        { value: '90', label: '过去90天' },
      ]}
    />
  )
}

export default DashboardFilter
