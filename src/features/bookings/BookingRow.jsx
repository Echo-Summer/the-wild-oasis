import { format, formatDistanceToNow, isToday } from 'date-fns'
import styled from 'styled-components'

import Table from '../../ui/Table'
import Tag from '../../ui/Tag'

import { zhCN } from 'date-fns/locale'
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Menus from '../../ui/Menus'
import Modal from '../../ui/Modal'
import Spinner from '../../ui/Spinner'
import { formatCurrency } from '../../utils/helpers'
import useCheckout from '../check-in-out/useCheckout'
import useDeleteBooking from './useDeleteBooking'

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate()
  const { checkout, isLoading: isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  if (isCheckingOut || isDeleting) return <Spinner />

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? '今天'
            : formatDistanceToNow(new Date(startDate), {
                locale: zhCN,
                addSuffix: true,
              })}{' '}
          &rarr; {numNights} 晚住宿
        </span>
        <span>
          {format(new Date(startDate), 'yyyy年M月d日', { locale: zhCN })}{' '}
          &mdash; {format(new Date(endDate), 'yyyy年M月d日', { locale: zhCN })}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            {/* 查看订单详情 */}
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              查看订单详情
            </Menus.Button>

            {/* check in订单 */}
            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                办理入住
              </Menus.Button>
            )}

            {/* check out订单 */}
            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
              >
                办理退房
              </Menus.Button>
            )}

            {/* 删除订单 */}
            <Modal.Open opens='delete-booking'>
              <Menus.Button icon={<HiTrash />}>删除</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name='delete-booking'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  )
}

export default BookingRow
