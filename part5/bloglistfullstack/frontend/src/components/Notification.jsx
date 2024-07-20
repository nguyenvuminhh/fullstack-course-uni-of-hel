import PropTypes from 'prop-types'

const Notification = ({ notiType, noti }) => {
    if (noti && notiType) {
        return (
            <p className={notiType}>{noti}</p>
        )
    }
    return null
}

Notification.propTypes = {
    notiType: PropTypes.string.isRequired,
    noti: PropTypes.string.isRequired
}

export default Notification