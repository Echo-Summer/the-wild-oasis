// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'

// import Input from '../../ui/Input'
// import Form from '../../ui/Form'
// import Button from '../../ui/Button'
// import FileInput from '../../ui/FileInput'
// import FormRow from '../../ui/FormRow'

// import { createCabin } from '../../services/apiCabins'

// function CreateCabinForm() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     getValues,
//     formState: { errors },
//   } = useForm()

//   const queryClient = useQueryClient()

//   const { isLoading: isCreating, mutate } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success('cabin successfully created')
//       queryClient.invalidateQueries({
//         queryKey: ['cabins'],
//       })
//       reset()
//     },

//     onError: (err) => toast.error(err.message),
//   })

//   //提交表格后
//   function onSubmit(data) {
//     mutate(data)
//     // console.log(data)
//   }

//   function onError(errors) {
//     console.log(errors)
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label='Cabin name' error={errors?.name?.message}>
//         <Input
//           type='text'
//           id='name'
//           {...register('name', { required: '小屋名字不能为空' })}
//         />
//       </FormRow>

//       <FormRow label='maxCapacity' error={errors?.maxCapacity?.message}>
//         <Input
//           type='number'
//           id='maxCapacity'
//           {...register('maxCapacity', {
//             required: '请输入小屋最大容量',
//             min: {
//               value: 1,
//               message: '最少为1人',
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label='regularPrice' error={errors?.regularPrice?.message}>
//         <Input
//           type='number'
//           id='regularPrice'
//           {...register('regularPrice', { required: '请填入价格' })}
//         />
//       </FormRow>

//       <FormRow label='discount' error={errors?.discount?.message}>
//         <Input
//           type='number'
//           id='discount'
//           defaultValue={0}
//           {...register('discount', {
//             required: '请填入折扣',
//             validate: (value) =>
//               value <= getValues('regularPrice') || '折扣需要小于价格',
//           })}
//         />
//       </FormRow>

//       <FormRow label='Cabin photo'>
//         <FileInput
//           id='image'
//           accept='image/*'
//           {...register('image', {
//             required: '请上传照片',
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation='secondary' type='reset'>
//           Cancel
//         </Button>
//         <Button disabled={isCreating}>Add cabin</Button>
//       </FormRow>
//     </Form>
//   )
// }

// export default CreateCabinForm

// /* <FormRow>
//         <Label htmlFor='name'>Cabin name</Label>
//         <Input
//           type='text'
//           id='name'
//           {...register('name', { required: '小屋名字不能为空' })}
//         />
//         {errors?.name?.message && <Error>{errors.name.message}</Error>}
//       </FormRow> */

// /* <FormRow>
//         <Label htmlFor='maxCapacity'>Maximum capacity</Label>
//         <Input
//           type='number'
//           id='maxCapacity'
//           {...register('maxCapacity', { required: '最少为1人' })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor='regularPrice'>Regular price</Label>
//         <Input
//           type='number'
//           id='regularPrice'
//           {...register('regularPrice', { required: '请填入价格' })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor='discount'>Discount</Label>
//         <Input
//           type='number'
//           id='discount'
//           defaultValue={0}
//           {...register('discount', {
//             required: '请填入折扣',
//             validate: (value) =>
//               value <= getValues('regularPrice') || '折扣需要小于价格',
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor='description'>Description for website</Label>
//         <Textarea
//           type='number'
//           id='description'
//           defaultValue=''
//           {...register('description', { required: '请对小屋进行描述' })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor='image'>Cabin photo</Label>
//         <FileInput id='image' accept='image/*' />
//       </FormRow> */
