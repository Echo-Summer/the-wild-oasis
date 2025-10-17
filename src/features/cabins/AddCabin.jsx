// import { useState } from 'react'

import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'
import CabinTable from './CabinTable'

function AddCabin() {
  return (
    <div>
      <Modal>
        {/* 使用opens和name将Open和Window连接起来 */}
        <Modal.Open opens='cabin-form'>
          <Button>添加新的小屋</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      {/* 可以复用，e.g.：
      <Modal>
        <Modal.Open opens='table'>
          <Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name='table'>
          <CabinTable />
        </Modal.Window>
      </Modal> */}
    </div>
  )
}

// function AddCabin() {
//   const [isOpenModel, setIsOpenModel] = useState(false)
//   return (
//     <>
//       <Button onClick={() => setIsOpenModel((show) => !show)}>Add Cabin</Button>
//       {isOpenModel && (
//         <Modal onClose={() => setIsOpenModel(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModel(false)} />
//         </Modal>
//       )}
//     </>
//   )
// }

export default AddCabin
