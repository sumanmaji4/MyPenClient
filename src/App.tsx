import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import Home from './pages/Home'
import Compiler from './pages/Compiler'
import NotFound from './pages/NotFound'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from './components/ui/sonner'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Header />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/compiler', element: <Compiler /> },
        { path: '/compiler/:urlId', element: <Compiler /> },
      ],
      errorElement: <NotFound />,
    },
  ])
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  )
}

export default App
