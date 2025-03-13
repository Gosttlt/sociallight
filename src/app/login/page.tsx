import Layout from '@/1Config/Layout'
import Header from '@/3Widgets/Header'
import LoginForm from './ui/LoginForm'

const Page = () => {
  return (
    <Layout header={<Header />}>
      <LoginForm />
    </Layout>
  )
}

export default Page
