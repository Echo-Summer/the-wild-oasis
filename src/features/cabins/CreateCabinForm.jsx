import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import FormRow from '../../ui/FormRow'

import useCreateCabin from './useCreateCabin'
import useEditCabin from './useEditCabin'

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // 从 cabinToEdit 里取出 id，其余的值放到 editValues
  const { id: editId, ...editValues } = cabinToEdit

  // 如果传进来的 cabin 有 id，就说明是编辑模式
  const isEditSession = Boolean(editId)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })

  // 使用自定义hook
  const { createCabin, isCreating } = useCreateCabin()
  const { editCabin, isEditing } = useEditCabin()
  const isWorking = isCreating || isEditing

  //提交表格后
  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset(data)
            onCloseModal?.()
          },
        }
      )
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            reset(data)
            onCloseModal?.()
          },
        }
      )
    }
    // console.log(data)
  }

  function onError(errors) {
    console.log(errors)
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='小屋名称' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: '小屋名字不能为空' })}
        />
      </FormRow>

      <FormRow label='容量' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: '请输入小屋最大容量',
            min: {
              value: 1,
              message: '最少为1人',
            },
          })}
        />
      </FormRow>

      <FormRow label='常规价格' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', { required: '请填入价格' })}
        />
      </FormRow>

      <FormRow label='折扣' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: '请填入折扣',
            validate: (value) =>
              value <= getValues('regularPrice') || '折扣需要小于价格',
          })}
        />
      </FormRow>

      <FormRow label='小屋照片'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : '请上传照片',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          取消
        </Button>
        <Button disabled={isWorking}>
          {' '}
          {isEditSession ? '编辑' : '创建新的'}小屋
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm

/* <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input
          type='text'
          id='name'
          {...register('name', { required: '小屋名字不能为空' })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */

/* <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', { required: '最少为1人' })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='regularPrice'>Regular price</Label>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', { required: '请填入价格' })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: '请填入折扣',
            validate: (value) =>
              value <= getValues('regularPrice') || '折扣需要小于价格',
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', { required: '请对小屋进行描述' })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput id='image' accept='image/*' />
      </FormRow> */
