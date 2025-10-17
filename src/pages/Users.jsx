import SignupForm from '../features/authentication/SignupForm'
import Heading from '../ui/Heading'

function NewUsers() {
  return (
    <>
      <Heading as='h1'>创建一个新的用户</Heading>
      <SignupForm />
    </>
  )
}

export default NewUsers
