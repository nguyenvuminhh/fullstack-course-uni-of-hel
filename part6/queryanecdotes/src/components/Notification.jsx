import { useNotiValue } from "../NotiContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notiValue = useNotiValue()
  console.log(notiValue)

  if (!notiValue) return null

  return (
    <div style={style}>
      {notiValue}
    </div>
  )
}

export default Notification
