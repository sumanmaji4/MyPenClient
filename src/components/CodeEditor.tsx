import { FC } from 'react'
import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { tags as t } from '@lezer/highlight'
import { draculaInit } from '@uiw/codemirror-theme-dracula'
import { loadLanguage } from '@uiw/codemirror-extensions-langs'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { updateCodeValue } from '@/redux/slices/compilerSlice'

interface CodeEditorProps {}

const CodeEditor: FC<CodeEditorProps> = ({}) => {
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  )
  // console.log(currentLanguage)

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  )

  const dispatch = useDispatch()
  const [value, setValue] = React.useState("console.log('hello world!');")
  const onChange = React.useCallback((value: string) => {
    // taken from https://www.npmjs.com/package/@uiw/react-codemirror
    // console.log('value:', value)
    // setValue(value)
    dispatch(updateCodeValue(value))
  }, [])
  return (
    <CodeMirror
      value={fullCode[currentLanguage]}
      // height='calc(100vh - 60px -50px)'
      height='90vh'
      extensions={[loadLanguage(currentLanguage)!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: '#c6c6c6',
          fontFamily: 'monospace',
        },
        styles: [{ tag: t.comment, color: '#6272a4' }],
      })}
    />
  )
}

export default CodeEditor
