import { useEffect, useState } from 'react'
// import './App.css'
import NewFlightForm from './components/NewFlightForm'
import { DiaryEntry } from './types'
import { getAll } from './service'
import FlightList from './components/FlightList'

const App = () => {
  const [list, setList] = useState<DiaryEntry[]>([])
  const [refetchValue, setRefetchValue] = useState<boolean>(true)
  const refetch = () => setRefetchValue(!refetchValue)

  useEffect(() => {
    getAll().then(data => setList(data))
  }, [refetchValue])

  return (
    <div>
      <NewFlightForm refetch={refetch}/>
      <h2>Flights</h2>
      <FlightList list={list} />
    </div>
  )
}

export default App
