import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  forwardRef,
  useRef,
  useImperativeHandle,
  ElementRef,
  ForwardRefRenderFunction
} from 'react'

function SomeComponent() {
  const [name, setName] = useState<string>(() => '')

  useEffect(() => {
    // without deps executed every render after render
    console.log('useEffect')
    console.log(name)

    return () => {}
  }, [])

  console.log('render')

  const someMethod = useCallback(() => {}, [])
  const complexComputed = useMemo(() => 1, [])

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}

interface SomeInputHandle {
  focus: () => void
}

const SomeInput: ForwardRefRenderFunction<SomeInputHandle> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    }
  }))
  return <input ref={inputRef} />
}

const SomeInputWithForwardedRef = forwardRef(SomeInput)

function CompareEffects() {
  const [name, setName] = useState<string>('')

  useEffect(() => console.log('on effect'))
  useLayoutEffect(() => console.log('on layout effect'))
  console.log('on render')

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </>
  )
}

const Layout = () => {
  const ref = useRef<ElementRef<typeof SomeInputWithForwardedRef>>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <>
      <SomeInputWithForwardedRef ref={ref} />
      <SomeComponent />
      <CompareEffects />
    </>
  )
}

export default Layout

// useCallback: used only while passing of functions as props, dependency list is required
// useMemo: for complex calculating
// useRef: does not notify if its content was changed
// useLayoutEffect: fires sync after dom manipulations, not runned until the Js is downloaded. Used for directly dom manipulations. fires after thr render before useEffect
