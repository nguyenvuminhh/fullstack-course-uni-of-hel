import { useDispatch } from 'react-redux'
import { find } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(find(event.target.value))
    }
    return (
        <p>
            filter: <input onChange={handleChange}/>
        </p>
    )
}

export default Filter