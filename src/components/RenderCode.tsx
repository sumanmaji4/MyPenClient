import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

type Props = {}

function RenderCode({}: Props) {
  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  )

  const combinedCode = `<html>
    <style>
      ${fullCode.css}
    </style>
    <body>
      ${fullCode.html}
    </body>
    <script>
      ${fullCode.javascript}
    </script>
  </html>`

  const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
    combinedCode
  )}` // copied from chat gpt
  return (
    <div className='bg-white h-[calc(100lvh-60px)]'>
      <iframe className='w-full h-full' src={iframeCode} />
    </div>
  )
}

export default RenderCode
