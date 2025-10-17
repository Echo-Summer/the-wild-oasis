import Heading from '../ui/Heading'
import Row from '../ui/Row'

import CabinTable from '../features/cabins/CabinTable'
import AddCabin from '../features/cabins/AddCabin'
import CabinTableOperations from '../features/cabins/CabinTableOperations'

function Cabins() {
  //   useEffect(function () {
  //     getCabins().then((data) => console.log(data))
  //   }, [])
  // const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>所有小屋</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
        {/* <Button
          // variation='primary'
          // size='medium'
          onClick={() => setShowForm((show) => !show)}
        >
          Add Cabin
        </Button>
        {showForm && <CreateCabinForm />} */}
      </Row>
    </>
  )
}

export default Cabins
