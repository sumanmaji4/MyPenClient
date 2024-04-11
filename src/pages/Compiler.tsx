import CodeEditor from '@/components/CodeEditor'
import HelperHeader from '@/components/HelperHeader'
import RenderCode from '@/components/RenderCode'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { updateFullCode } from '@/redux/slices/compilerSlice'
// import { handleError } from '@/utils/handleError'
import axios from 'axios'

import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

interface CompileProps {}

const Compiler: FC<CompileProps> = ({}) => {
  const { urlId } = useParams()
  const dispatch = useDispatch()

  const loadCode = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_HOST_URL}/compiler/load`,
        {
          urlId: urlId,
        }
      )
      // console.log(response.data)
      dispatch(updateFullCode(response.data.fullCode))
    } catch (error) {
      // handleError(error)
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 500) {
          toast('Invalid URL, Default Code Loaded')
        }
      }
    }
  }

  useEffect(() => {
    if (urlId) loadCode()
  }, [urlId])

  return (
    <ResizablePanelGroup direction='horizontal' className=''>
      <ResizablePanel
        defaultSize={50}
        className='h-[calc(100dvh-60px)] min-w-[350px]'
      >
        <HelperHeader />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        defaultSize={50}
        className='h-[calc(100dvh-60px)] min-w-[350px]'
      >
        <RenderCode />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Compiler
