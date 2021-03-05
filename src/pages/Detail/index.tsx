import useRoute from 'router/useRoute'

const Detail = () => {
  const { goToHome } = useRoute()
  return (
    <div>
      <div>Detail</div>
      <button className="mt-8" type="button" onClick={goToHome}>
        Go To Home
      </button>
    </div>
  )
}

export default Detail
