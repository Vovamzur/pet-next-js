import React, {useRef, useState} from 'react'
import type {NextPage, GetStaticProps} from 'next'

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

const Posts: NextPage<PostsProps> = ({a}) => {
  return (
    <div>
      Posts
      {a}
      <ClassComponent />
      <Form />
    </div>
  )
}

export default Posts
