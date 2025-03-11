import { useauthStore } from "../../store/AuthUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const {user} = useauthStore();
  return (
    <div>{user?  <HomeScreen/> : <AuthScreen/>} </div>
    
  )
}

export default HomePage
