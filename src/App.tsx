import { ReactNode, useEffect } from 'react'
import { Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { fetchList } from 'store/pokemon'
import images from 'assets/images'

interface Props {
  children: ReactNode
}

const App = ({ children }: Props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Row
      style={{ backgroundImage: `url(${images.ContainerBg})` }}
      justify="center"
      className="dark:bg-gray-800 bg-gray-200 min-w-screen min-h-screen"
    >
      <Col xs={24} sm={18}>
        {children}
      </Col>
    </Row>
  )
}

export default App
