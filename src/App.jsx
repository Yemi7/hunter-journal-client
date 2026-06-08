import { useState } from 'react'
import Home from './pages/Home'
import Journal from './pages/Journal'
import MyNavbar from './components/MyNavbar'
import EnemyDetails from './pages/EnemyDetails'
import EditEnemey from './pages/EditEnemy'
import LocationList from './pages/LocationList'
import LocationDetails from './pages/LocationDetails'
import { Route, Routes } from 'react-router-dom'
import About from './pages/about'

function App() {

  return (
    <div>
      <MyNavbar />
      <div>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/journal"} element={<Journal />} />
          <Route path={"/enemy-details/:enemyId"} element={<EnemyDetails />} />
          <Route path={"/edit-enemy"} element={<EditEnemey />} />
          <Route path={"location-list"} element={<LocationList />} />
          <Route path={"location-details/:locationId"} element={<LocationDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
