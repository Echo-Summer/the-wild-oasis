import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import useSignup from './useSignup'
import Spinner from '../../ui/Spinner'

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup()
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    mode: 'onChange', //输入时就校验
  })
  const { errors } = formState

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    )
  }

  if (isLoading) return <Spinner />

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='姓名' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isLoading}
          {...register('fullName', {
            required: '必填字段',
          })}
        />
      </FormRow>

      <FormRow label='邮箱' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isLoading}
          {...register('email', {
            required: '必填字段',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: '请提供有效邮箱',
            },
          })}
        />
      </FormRow>

      <FormRow label='密码(至少6个字符)' error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register('password', {
            required: '必填字段',
            minLength: {
              value: 6,
              message: '请提供至少6个字符的密码',
            },
          })}
        />
      </FormRow>

      <FormRow label='重复密码' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: '必填字段',
            validate: (value) =>
              value === getValues().password || '两次输入的密码需要一致',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          取消
        </Button>
        <Button>创建新用户</Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
