import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'
import { useEffect, useState } from 'react'
import { useMoveBack } from '../../hooks/useMoveBack'

import { useSettings } from '../settings/useSettings'
import { formatCurrency } from '../../utils/helpers'
import useBooking from '../bookings/useBooking'
import useCheckin from './useCheckin'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Spinner from '../../ui/Spinner'
import Checkbox from '../../ui/Checkbox'
// import { id } from 'date-fns/locale'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const [addBreakfast, setAddBreakfast] = useState(false)
  const [confirmPaid, setConfirmedPaid] = useState(false)
  const { booking, isLoading } = useBooking()
  const { settings, isLoading: isLoadingSettings } = useSettings()

  // 可选链（?.）和空值合并运算符（??）的组合写法。
  //  booking?.isPaid：如果 booking 存在，则取其 isPaid 属性，否则为 undefined。
  //  ?? false：如果前面的结果是 null 或 undefined，则使用 false 作为默认值。
  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking])

  const moveBack = useMoveBack()

  const { checkin, isCheckingIn } = useCheckin()

  if (isLoading || isLoadingSettings) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking

  const optionalBreakfastPrice =
    (settings?.breakfastPrice ?? 0) * numGuests * numNights

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>办理预定订单 #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; 返回</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />

      {/* 是否添加早餐, 对于没有提前购买早餐的客人 */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add)
              setConfirmedPaid(false)
            }}
            id='breakfast'
          >
            需要添加价格为 {formatCurrency(optionalBreakfastPrice)} 的早餐吗?
          </Checkbox>
        </Box>
      )}

      {/* 确认是否已支付费用，数据的isPaid为初始状态 */}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
          id='confirm'
          disabled={confirmPaid || isCheckingIn}
        >
          我确认 {guests.fullName} 已经支付了订单总额{' '}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      {/* 如果已经支付费用，确认是否check in */}
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          办理入住 #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          返回
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
