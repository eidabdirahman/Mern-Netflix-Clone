import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";
import { useauthStore } from "./store/AuthUser";

function App() {
 const { user, ischeckingAuth, authcheck } = useauthStore();
 console.log(user)
  useEffect(() => {
    authcheck();}
  ,[authcheck])

  if(ischeckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={!user? <LoginPage /> : <Navigate to={"/"}/>} />
        <Route path="/Signup" element={!user ? <RegisterPage /> : <Navigate to={"/"} />} />
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
				<Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
      <Footer />
      <Toaster/>
    </div>
  );
}

export default App;
