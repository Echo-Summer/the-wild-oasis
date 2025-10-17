import { useState } from 'react'
import { isFuture, isPast, isToday } from 'date-fns'
import supabase from '../services/supabase'
import Button from '../ui/Button'
import { subtractDates } from '../utils/helpers'

import { bookings } from './data-bookings'
import { cabins } from './data-cabins'
import { guests } from './data-guests'

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

// 先清空旧数据，避免重复插入导致冲突
async function deleteGuests() {
  const { error } = await supabase.from('guests').delete().gt('id', 0)
  if (error) console.log(error.message)
}

async function deleteCabins() {
  const { error } = await supabase.from('cabins').delete().gt('id', 0)
  if (error) console.log(error.message)
}

async function deleteBookings() {
  const { error } = await supabase.from('bookings').delete().gt('id', 0)
  if (error) console.log(error.message)
}

// 插入样本数据 guests
async function createGuests() {
  console.log('Uploading guests:', guests)
  const { error } = await supabase.from('guests').insert(guests)
  if (error) console.log(error.message)
}

// 插入样本数据 cabins
async function createCabins() {
  const { error } = await supabase.from('cabins').insert(cabins)
  if (error) console.log(error.message)
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB

  // 查询数据库，拿到最新的 guestIds 和 cabinIds
  const { data: guestsIds } = await supabase
    .from('guests')
    .select('id')
    .order('id')
  const allGuestIds = guestsIds.map((cabin) => cabin.id)
  const { data: cabinsIds } = await supabase
    .from('cabins')
    .select('id')
    .order('id')
  const allCabinIds = cabinsIds.map((cabin) => cabin.id)

  // 把 booking 数据里的 guestId 和 cabinId 替换成真实的数据库 ID（通过顺序对应）
  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1)
    const numNights = subtractDates(booking.endDate, booking.startDate)
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount)
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0 // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice

    let status
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out'
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed'
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in'

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    }
  })

  console.log(finalBookings)

  // 插入数据库
  const { error } = await supabase.from('bookings').insert(finalBookings)
  if (error) console.log(error.message)
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false)

  async function uploadAll() {
    setIsLoading(true)
    // Bookings need to be deleted FIRST
    await deleteBookings()
    await deleteGuests()
    await deleteCabins()

    // Bookings need to be created LAST
    await createGuests()
    await createCabins()
    await createBookings()

    setIsLoading(false)
  }

  async function uploadBookings() {
    setIsLoading(true)
    await deleteBookings()
    await createBookings()
    setIsLoading(false)
  }

  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: '#e0e7ff',
        padding: '8px',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  )
}

export default Uploader
