import Header from '@/components/Header'
import { FC } from 'react'

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
  return (
    <>
      <Header />
      <div className=' w-full h-[calc(100dvh-60px)] bg-gray-800 text-white flex justify-center items-center'>
        404 | Page not found
      </div>
    </>
  )
}

export default NotFound
