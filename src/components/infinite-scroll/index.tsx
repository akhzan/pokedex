import { useEffect, useRef } from 'react'
import { Button, Row, Spin } from 'antd'

interface Props {
  hasMore: boolean
  loading: boolean
  next: () => void
}

const InfiniteScroll = ({ hasMore, loading, next }: Props) => {
  const loader = useRef<any>(null)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }
    const handleObserver = (entities: any) => {
      const target = entities[0]
      if (target.isIntersecting && !loading) {
        next()
      }
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore])
  return hasMore ? (
    <Row justify="center" className="mb-12 mt-8">
      <Button type="text" icon={<Spin />} ref={loader} />
    </Row>
  ) : null
}

export default InfiniteScroll
