import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm'
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

function Account() {
  return (
    <>
      <Heading as='h1'>更新你的账户信息</Heading>

      <Row>
        <Heading as='h3'>更新用户数据</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as='h3'>更新密码</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  )
}

export default Account
