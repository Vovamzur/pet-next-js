import React, {
  Component,
  createContext,
  FC,
  forwardRef,
  MouseEvent,
  Profiler,
  PropsWithChildren,
  PropsWithRef,
  PureComponent,
  ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState
} from 'react'
import type {NextPage, GetStaticProps} from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import ReactDOM from 'react-dom'
import Layout from '../../components/Layout'

interface PostsProps {
  a: number
}

export const getStaticProps: GetStaticProps<PostsProps> = async ({
  params,
  preview,
  previewData
}) => {
  console.log({
    params,
    preview,
    previewData
  })

  return {
    props: {
      a: 1
    }
  }
}

interface ClassComponentProps {}
interface ClassComponentState {
  someProp: number
  clicksCount: number
}

class ClassComponent extends React.Component<
  ClassComponentProps,
  ClassComponentState
> {
  constructor(props: ClassComponentProps) {
    super(props)

    this.state = {
      clicksCount: 0,
      someProp: 1
    }

    this.increment = this.increment.bind(this)
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // catch error
  }

  componentDidMount(): void {
    // on mounted
  }

  componentWillUnmount(): void {
    // before destroy
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    // updated
  }

  shouldComponentUpdate(
    nextProps: Readonly<ClassComponentProps>,
    nextState: Readonly<ClassComponentState>,
    nextContext: any
  ): boolean {
    return true
  }

  increment() {
    this.setState((state) => ({clicksCount: state.clicksCount + 1}))
  }

  decrement = () => {
    this.setState((state) => ({...state, clicksCount: state.clicksCount - 1}))
  }

  render() {
    return (
      <div>
        Class component: someProp:{this.state.someProp}
        <br />
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <br />
        Clicked times {this.state.clicksCount}
      </div>
    )
  }
}

type Flavor = 'grapefruit' | 'lime' | 'coconut'

function Form() {
  const nameRef = useRef<HTMLInputElement>(null)
  const [age, setAge] = useState<number>(18)
  const [flavor, setFlavor] = useState<Flavor>('coconut')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault() // only in that way since return boolean is not supported

    console.log(e.target)
    console.log({
      name: nameRef.current!.value,
      age,
      flavor
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Name:
        <input type="text" name="name" ref={nameRef} />
      </label>

      <label>
        Age:
        <input
          aria-label="Name"
          aria-required="true"
          type="number"
          value={age}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAge(e.target.valueAsNumber)
          }
        />
      </label>

      <label>
        Pick your favorite flavor:
        <select
          value={flavor}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFlavor(e.target.value as Flavor)
          }
        >
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  )
}

const SemanticUI = () => {
  return (
    <div>
      <base href="http://localhost:3000" />
      <address>Ivana Mazepy 16</address>
      <article>Article</article>
      <aside>not main content</aside>
      <main>dominant content of the body</main>

      <blockquote>some text</blockquote>

      <dl>
        Description list
        <dt>Description term</dt>
        <dd>Description details</dd>
        <dt>Morgawr</dt>
        <dd>A sea serpent.</dd>
      </dl>

      <figure>
        {/* some image */}
        <figcaption>An elephant at sunset</figcaption>
      </figure>
      <hr />
      <abbr>FBI</abbr>
      <bdi>الرجل القوي إيان</bdi>
      <bdo dir="ltr">الرجل القوي إيان</bdo>

      <figure>
        <blockquote>
          <p>
            It was a bright cold day in April, and the clocks were striking
            thirteen.
          </p>
        </blockquote>
        <figcaption>
          First sentence in{' '}
          <cite>
            <a href="http://www.george-orwell.org/1984/0.html">
              Nineteen Eighty-Four
            </a>
          </cite>{' '}
          by George Orwell (Part 1, Chapter 1).
        </figcaption>
      </figure>
      <code>const a = 'string'</code>

      <p>New Products:</p>
      <ul>
        <li>
          <data value="398">Mini Ketchup</data>
        </li>
        <li>
          <data value="399">Jumbo Ketchup</data>
        </li>
        <li>
          <data value="400">Mega Jumbo Ketchup</data>
        </li>
      </ul>

      <label htmlFor="fuel">Fuel level:</label>

      <meter
        id="fuel"
        min="0"
        max="100"
        low={33}
        high={66}
        optimum={80}
        value="50"
      >
        at 50/100
      </meter>
    </div>
  )
}

interface BlurExampleProps {}
interface BlurExampleState {
  isOpen: boolean
}

class BlurExample extends React.Component<BlurExampleProps, BlurExampleState> {
  timeOutId: null | NodeJS.Timeout

  constructor(props: BlurExampleProps) {
    super(props)

    this.state = {isOpen: false}

    this.timeOutId = null

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onBlurHandler = this.onBlurHandler.bind(this)
    this.onFocusHandler = this.onFocusHandler.bind(this)
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen
    }))
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      })
    })
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId!)
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    return (
      <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    )
  }
}

const LazyComponent = dynamic(
  async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
    return await import('../../components/LazyComponent')
  },
  {
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

const SomeContext = createContext({someProp: 1})

interface MyButtonProps {}
const MyButton: FC<PropsWithChildren<PropsWithRef<MyButtonProps>>> = ({
  children
}) => {
  return <button>{children}</button>
}

const ButtonWithForwardedRef = forwardRef<
  HTMLButtonElement,
  {children: ReactNode}
>((props, ref) => {
  return (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  )
})

class RefButton extends Component<PropsWithChildren> {
  render() {
    return <button>{this.props.children}</button>
  }
}

const TestRef = () => {
  const tagRef = useRef<HTMLButtonElement>()
  const instanceRef = useRef<RefButton>() // NOT allowed for functional components
  const forwardedRef = useRef<HTMLButtonElement>()

  console.log({
    tagRef,
    instanceRef,
    forwardedRef
  })

  return (
    <>
      <button ref={tagRef}>Button tag</button>
      <RefButton ref={instanceRef}>oh</RefButton>
      <ButtonWithForwardedRef ref={forwardedRef}>
        Forwarded ref
      </ButtonWithForwardedRef>
    </>
  )
}

// nor rerendered on parent rerender
class MyPureComponent extends PureComponent {
  render() {
    return <div></div>
  }
}

// React.memo and React.PureComponent are the same

// props.children can be a function like in the context

const Portal: React.FC<PropsWithChildren<{className: string; el: string}>> = ({
  children,
  className = 'root-portal',
  el = 'div'
}) => {
  const [container] = useState(() => document.createElement(el))

  useEffect(() => {
    container.classList.add(className)
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return ReactDOM.createPortal(children, container)
}

function MyProfiler({children}: PropsWithChildren) {
  const onProfilerRender: React.ProfilerOnRenderCallback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions
    })
  }

  return (
    <Profiler id="MyProfiler" onRender={onProfilerRender}>
      {children}
    </Profiler>
  )
}

MyProfiler.defaultProps = {}

interface MouseTrackerProps {}
interface MouseTrackerState {
  x: number
  y: number
}

class MouseTracker extends React.Component<
  MouseTrackerProps,
  MouseTrackerState
> {
  constructor(props: MouseTrackerProps) {
    super(props)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.state = {x: 0, y: 0}
  }

  handleMouseMove(event: MouseEvent) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }

  render() {
    return (
      <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>
          The current mouse position is ({this.state.x}, {this.state.y})
        </p>
      </div>
    )
  }
}

const Posts: NextPage<PostsProps> = ({a}) => {
  return (
    <React.StrictMode>
      <Layout />
      <SomeContext.Provider value={{someProp: 2}}>
        Posts
        {a}
        <ClassComponent />
        <Form />
        <SemanticUI />
        <BlurExample />
        <Suspense>
          <LazyComponent />
        </Suspense>
        <Profiler id="testRef" onRender={() => console.log('asd')}>
          <TestRef />
        </Profiler>
        <MouseTracker />
      </SomeContext.Provider>
    </React.StrictMode>
  )
}

export default Posts

/**
 * is component types are different - rebuild full tree
 * compare attribute for html tags, props for components
 *
 * insert to the end of array is efficient, to the start is inefficient, so use keys
 * use array index if there is not reordering, reorders will be slow
 *
 * render prop is a function prop which return a template
 * No need to use with PureComponent since function link is changed every time
 *
 *
 * children prop can be passed ni two ways
 *
 * StrictMode executed some hook twice to spot the bugs
 *  - ensuring reusable state - remouting
 * 
 * UnController component: ref + getting the result in the handler instead of value + onChange
 * These element types support defaultChecked, defaultValue
 * 
 * 
 * Web Components provide strong encapsulation for reusable components, React provides a declarative library that keeps the DOM in sync with your data
 *  - uses class not className
 *
 */
