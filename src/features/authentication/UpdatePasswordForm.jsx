// import { useForm } from 'react-hook-form'
// import Button from '../../ui/Button'
// import Form from '../../ui/Form'
// import FormRow from '../../ui/FormRow'
// import Input from '../../ui/Input'
// import useUpdateUser from './useUpdateUser'

// function UpdatePasswordForm() {
//   const { register, handleSubmit, formState, getValues, reset } = useForm()
//   const { errors } = formState

//   const { updateUser, isUpdating } = useUpdateUser()

//   function onSubmit({ password }) {
//     updateUser({ password }, { onSuccess: reset })
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow label='新密码(至少6个字符)' error={errors?.password?.message}>
//         <Input
//           type='password'
//           id='password'
//           autoComplete='current-password'
//           disabled={isUpdating}
//           {...register('password', {
//             required: 'This field is required',
//             minLength: {
//               value: 6,
//               message: 'Password needs a minimum of 6 characters',
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label='再次确认密码' error={errors?.passwordConfirm?.message}>
//         <Input
//           type='password'
//           autoComplete='new-password'
//           id='passwordConfirm'
//           disabled={isUpdating}
//           {...register('passwordConfirm', {
//             required: 'This field is required',
//             validate: (value) =>
//               getValues().password === value || 'Passwords need to match',
//           })}
//         />
//       </FormRow>
//       <FormRow>
//         <Button onClick={reset} type='reset' variation='secondary'>
//           取消
//         </Button>
//         <Button disabled={isUpdating}>更新密码</Button>
//       </FormRow>
//     </Form>
//   )
// }

// export default UpdatePasswordForm

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import useUpdateUser from './useUpdateUser'
import supabase from '../../services/supabase'

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm()
  const { errors } = formState

  const { updateUser, isUpdating } = useUpdateUser()

  async function onSubmit({ currentPassword, password }) {
    try {
      // 1. 先获取当前用户的邮箱
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user?.email) {
        toast.error('无法获取用户信息')
        return
      }

      // 2. 用当前密码重新认证
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      })

      if (signInError) {
        toast.error('当前密码错误，请重试')
        return
      }

      // 3. 认证成功后更新密码
      updateUser({ password }, { onSuccess: reset })
    } catch (error) {
      console.error('密码更新失败:', error)
      toast.error('操作失败，请重试')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* 添加当前密码字段 */}
      <FormRow label='当前密码' error={errors?.currentPassword?.message}>
        <Input
          type='password'
          id='currentPassword'
          autoComplete='current-password'
          disabled={isUpdating}
          {...register('currentPassword', {
            required: '请输入当前密码',
          })}
        />
      </FormRow>

      <FormRow label='新密码(至少6个字符)' error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          autoComplete='new-password'
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password needs a minimum of 6 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label='再次确认密码' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        <Button onClick={reset} type='reset' variation='secondary'>
          取消
        </Button>
        <Button disabled={isUpdating}>更新密码</Button>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
