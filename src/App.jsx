import './App.css'
import { useAuthContext } from './mytools/context/context'
import Router from './router/router'
import { Toaster } from 'react-hot-toast'
function App() {
  const{theme}=useAuthContext();
  return (
    <>
      <Toaster position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
            zIndex: 9999, 
          },
        }}
       reverseOrder={false} />
      <div className={`bg-gradient-to-br min-h-screen ${theme==='dark'?' from-black via-blue-950 to-black darkcall':"darkcall"} text-white`}>
         <Router></Router>
       </div>
    </>
  )
}

export default App
