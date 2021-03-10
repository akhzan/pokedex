import { Button, Card, Col, Row } from 'antd'
import useRoute from 'router/useRoute'

const NotFound = () => {
  const { goToHome } = useRoute()
  return (
    <Row justify="center" align="middle" className="h-screen">
      <Col xs={24} sm={18} md={12}>
        <Card>
          <img
            className="w-24 h-auto mb-4"
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png"
            alt=""
          />
          <div className="text-lg mb-2 text-gray-400 italic">
            Nothing to do here.
          </div>
          <Button onClick={goToHome}>Back to home</Button>
        </Card>
      </Col>
    </Row>
  )
}

export default NotFound
