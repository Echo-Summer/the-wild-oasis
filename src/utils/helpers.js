import { formatDistance, parseISO } from 'date-fns'
import { differenceInDays } from 'date-fns'

// We want to make this function work for both Date objects and strings (which come from Supabase)

/**
 * 一堆 日期工具函数 和 货币格式化函数，主要用途是：
  数据展示（比如订单金额、房间价格、入住时间等）。
  日期计算和对比（比如住几天、多久以前创建的记录、是否超过今天）。
 */

//计算两个日期之间相差多少天。
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)))

//把日期转成“相对现在”的人类可读字符串。
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In')

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time

//返回今天的日期（ISO 字符串）
export const getToday = function (options = {}) {
  const today = new Date()

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999)
  else today.setUTCHours(0, 0, 0, 0)
  return today.toISOString()
}

//把数字格式化为人民币货币字符串。
export const formatCurrency = (value) =>
  new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(
    value
  )

// 排序
export function sortByField(data, sortBy, defaultValue = null) {
  if (!sortBy) return data

  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1

  return [...data].sort((a, b) => {
    let valA = a[field]
    let valB = b[field]

    // 1. 如果字段不存在，返回原顺序
    if (valA === undefined || valB === undefined) return 0

    // 2. 日期类型（字符串可转 Date）
    if (
      typeof valA === 'string' &&
      typeof valB === 'string' &&
      /\d{4}-\d{2}-\d{2}/.test(valA) // 简单判断 YYYY-MM-DD
    ) {
      return (new Date(valA).getTime() - new Date(valB).getTime()) * modifier
    }

    // 3. 字符串类型
    if (typeof valA === 'string' && typeof valB === 'string') {
      return valA.localeCompare(valB) * modifier
    }

    // 4. 数字类型
    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * modifier
    }

    // 5. 兜底：不排序
    return 0
  })
}
