import { useState } from 'react'
import Home from './pages/Home'
import Journal from './pages/Journal'
import MyNavbar from './components/MyNavbar'
import EnemyDetails from './pages/EnemyDetails'
import EditEnemy from './pages/EditEnemy'
import LocationList from './pages/LocationList'
import LocationDetails from './pages/LocationDetails'
import CreateEnemy from './pages/CreateEnemy'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'



function App() {

  return (
    <div>
      <MyNavbar />
      <div className='dark mx-auto my-0'>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/journal"} element={<Journal />} />
          <Route path={"/enemy-details/:enemyId"} element={<EnemyDetails />} />
          <Route path={"/edit-enemy/:enemyId"} element={<EditEnemy />} />
          <Route path={"/create-enemy"} element={<CreateEnemy />} />
          <Route path={"location-list"} element={<LocationList />} />
          <Route path={"location-details/:locationId"} element={<LocationDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
