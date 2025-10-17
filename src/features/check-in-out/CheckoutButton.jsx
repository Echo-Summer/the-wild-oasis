import Button from '../../ui/Button'
import Spinner from '../../ui/Spinner'

import useCheckout from './useCheckout'

function CheckoutButton({ bookingId }) {
  const { checkout, isLoading: isCheckingOut } = useCheckout()

  if (isCheckingOut) return <Spinner />

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => checkout(bookingId)}
    >
      办理退房
    </Button>
  )
}

export default CheckoutButton
