import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import useBooking from './useBooking'
import Spinner from '../../ui/Spinner'
import { useNavigate } from 'react-router-dom'
import CheckoutButton from '../check-in-out/CheckoutButton'
import useDeleteBooking from './useDeleteBooking'
import Modal from '../../ui/Modal'
import Menus from '../../ui/Menus'
import { HiTrash } from 'react-icons/hi2'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Empty from '../../ui/Empty'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  const { status, id: bookingId } = booking || {}
  const { deleteBooking, isDeleting } = useDeleteBooking()
  const moveBack = useMoveBack()
  const navigate = useNavigate()

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  if (isLoading || isDeleting) return <Spinner />
  if (!booking) return <Empty resourceName='booking' />

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>订单 # {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; 返回</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            办理入住
          </Button>
        )}

        {status === 'checked-in' && <CheckoutButton bookingId={bookingId} />}

        <Modal>
          {/* 删除订单 */}
          <Modal.Open opens='delete-booking'>
            <Button variation='danger' icon={<HiTrash />}>
              删除订单
            </Button>
          </Modal.Open>

          <Modal.Window name='delete-booking'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSettled: navigate(-1), // 通过此属性，可以删除完booking后返回上一步
                })
              }}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          返回
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
