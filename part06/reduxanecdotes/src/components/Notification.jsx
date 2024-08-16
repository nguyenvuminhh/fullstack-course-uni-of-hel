import { useSelector } from 'react-redux'

const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notiMessage = useSelector(state => state.notification)
  if (!notiMessage) {
    return null
  }
  return (
    <div style={style}>
      {notiMessage}
    </div>
  )
}

export default Notification