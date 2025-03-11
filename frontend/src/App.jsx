import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/main'
import AllRoutes from './routes/AllRoutes'
import { useAuthStore } from './store/useAuthStore'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useThemeStore } from './store/useThemeStore'

function App() {
  const {checkAuth,authUser,isCheckingAuth,onlineUsers}=useAuthStore();
  console.log(onlineUsers)
  const {theme}=useThemeStore()

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return <div>Loading...</div>
  }

  return (
    <div data-theme={theme}>
      <ToastContainer autoClose={3000} position="bottom-right"/>
      <Header/>
      <AllRoutes/>
    </div>
  )
}

export default App
