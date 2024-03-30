import { Button } from './ui/button'
import { Save, Share2, LoaderCircle, Copy } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDispatch, useSelector } from 'react-redux'
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from '@/redux/slices/compilerSlice'
import { RootState } from '@/redux/store'
import { handleError } from '@/utils/handleError'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { toast } from 'sonner'

function HelperHeader() {
  const { urlId } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [showShareBtn, setShowShareBtn] = useState<boolean>(false)

  useEffect(() => {
    if (urlId) setShowShareBtn(true)
    else setShowShareBtn(false)
  }, [urlId])

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  )
  const navigate = useNavigate()
  const handleSaveCode = async () => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_HOST_URL}/compiler/save`,
        {
          fullCode: fullCode,
        }
      )

      // console.log(response)
      navigate(`/compiler/${response.data.url}`, { replace: true })
    } catch (error) {
      // handleError(error)
      toast('Unable to save the code')
    } finally {
      setLoading(false)
    }
  }

  const dispatch = useDispatch()
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  )

  return (
    <div className='h-[50px]bg-black text-white p-2 __helper_header flex justify-between items-center'>
      <div className='__btn_container flex gap-2'>
        <Button
          disabled={loading}
          onClick={handleSaveCode}
          variant='success'
          className='flex justify-center items-center gap-1'
        >
          {loading ? (
            <>
              <LoaderCircle className=' animate-spin' /> Sending..
            </>
          ) : (
            <>
              <Save size={16} /> Save
            </>
          )}
        </Button>
        {showShareBtn && (
          <Dialog>
            <DialogTrigger className='whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex justify-center items-center gap-1'>
              Share
              <Share2 size={16} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='flex justify-center text-xl mb-4'>
                  &lt; Share you code / &gt;
                </DialogTitle>
                <DialogDescription className='flex flex-col gap-2'>
                  <div className='__url flex gap-1'>
                    <input
                      type='text'
                      disabled
                      className='w-full px-2 py-2 rounded bg-slate-900 select-none'
                      value={window.location.href}
                    />
                    <Button
                      variant='outline'
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          window.location.href
                        ) // to copy
                        toast('Url copied to your clipboard')
                      }}
                    >
                      <Copy size={15} />
                    </Button>
                  </div>
                  <p className=' text-center'>Share this url to your friends</p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className='__tab_switcher'>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType['currentLanguage']
              )
            )
          }
        >
          <SelectTrigger className='w-[140px] bg-slate-800 focus:ring-0'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='html'>HTML</SelectItem>
            <SelectItem value='css'>CSS</SelectItem>
            <SelectItem value='javascript'>JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default HelperHeader
