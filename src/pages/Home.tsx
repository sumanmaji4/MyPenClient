import { FC } from 'react'

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return (
    <div className='w-full h-[calc(100lvh-60px)] text-white flex mt-40 items-center flex-col'>
      <h1 className='text-7xl font-bold text-center'>MyPen</h1>
      <p className=' text-slate-500 text-xl text-center font-bold mt-8 max-w-[650px]'>
        A online compiler for HTML, CSS and JavaScript. Compile your code on the
        go and share it with your friends
      </p>
    </div>
  )
}

export default Home
