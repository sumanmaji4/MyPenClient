import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Button } from './ui/button'

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <>
      <nav className='w-full h-[60px] bg-slate-900 text-white p-3 flex justify-between items-center'>
        <Link to='/'>
          <h2 className='font-bold text-2xl select-none'>MyPen</h2>
        </Link>
        <ul>
          <li>
            <Link to='/compiler'>
              <Button variant='secondary'>Compiler</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Header
