import { PAGE_SIZE } from '../utils/constants'
import { getToday } from '../utils/helpers'
import supabase from './supabase'

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select('*,cabins(name),guests(fullName,email)', { count: 'exact' }) //还可以返回数据的数量

  // filter
  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value)
  }

  // sort
  // query.order(field, { ascending: ... })，就是 Supabase 提供的 排序 API。
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    })
  }

  //pagination
  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    query = query.range(from, to)
  }

  const { data, error, count } = await query

  if (error) {
    console.error(error)
    throw new Error('Bookings could not be loaded')
  }
  return { data, count }
}

// 拿到某个预订的完整信息
export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking not found')
  }

  return data
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// 获取 最近一段时间的预订数据（用于报表，比如'最近 30 天收入'）
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date) //created_at >= date (大于等于指定日期)
    .lte('created_at', getToday({ end: true })) // created_at <= 今天结束时间

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

// Returns all STAYS that are were created after the given date
// 获取某个日期之后的入住记录
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday())

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }

  return data
}

// Activity means that there is a check in or a check out today
// 获取今天的入住/退房活动
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at')

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error)
    throw new Error('Bookings could not get loaded')
  }
  return data
}

// 更新预订, 比如修改客人的特殊要求、修改价格。
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw new Error('Booking could not be updated')
  }
  return data
}

// 删除预订
export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Booking could not be deleted')
  }
  return data
}
