import { Route, Routes } from 'react-router'
import './App.css'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { OAuth2RedirectHandler } from './components/OAuth2RedirectHandler'
import { SetupPage } from './pages/SetupPage'
import { OrderingPage } from './pages/OrderingPage'

function App() {


  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/setup' element={<SetupPage />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/customer/menu" element={<OrderingPage />} />
      </Routes>
    </>
  )
}

export default App
