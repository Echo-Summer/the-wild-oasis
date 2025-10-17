// import { useState } from 'react'
import styled from 'styled-components'

import CreateCabinForm from './CreateCabinForm'
import useDeleteCabin from './useDeleteCabin'
import { formatCurrency } from '../../utils/helpers'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import useCreateCabin from './useCreateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`

// 设置小屋页面的表格每行内容
function CabinRow({ cabin }) {
  // const [showForm, setShowForm] = useState(false)
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { isCreating, createCabin } = useCreateCabin()

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    })
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity}人 (最多入住)</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* 复制cabin */}
        {/* <button disabled={isCreating} onClick={handleDuplicate}>
          <HiSquare2Stack />
        </button> */}

        {/* 修改cabin信息 */}
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isCreating}
              >
                复制
              </Menus.Button>

              <Modal.Open opens='edit-cabin'>
                <Menus.Button icon={<HiPencil />}>编辑</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete-cabin'>
                <Menus.Button icon={<HiTrash />}>删除</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='edit-cabin'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            {/* 删除按钮的disabled属性：避免用户在请求还没完成时重复点击按钮 */}

            <Modal.Window name='delete-cabin'>
              <ConfirmDelete
                resourceName='cabin'
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
    // {showForm && <CreateCabinForm cabinToEdit={cabin} />}
  )
}

export default CabinRow
