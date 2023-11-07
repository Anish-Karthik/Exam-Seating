
import dynamic from 'next/dynamic'
const MainForm = dynamic(() => import('@/components/main-form'), { ssr: false })
const Page = async () => {
  return (
    <MainForm /> 
  )
}

export default Page

