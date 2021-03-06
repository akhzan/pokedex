import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const App = ({ children }: Props) => {
  return (
    <div className="dark:bg-gray-800 bg-gray-200 min-w-screen min-h-screen p-4 flex justify-center">
      <div className="w-full md:w-3/4 lg:w-2/3">{children}</div>
    </div>
  )
}

export default App
