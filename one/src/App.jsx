import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginAuth from "./auth/LoginAuth"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute"
import RegisterAuth from "./auth/RegisterAuth"

function App() {
  return (
    <>
    <h1>hello</h1>
    <BrowserRouter>
    <Routes>
       <Route path="/loginauth"element={<LoginAuth/>}/>
       <Route path="/"element={<RegisterAuth/>}/>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
