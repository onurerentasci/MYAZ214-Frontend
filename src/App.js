import HomeScreen from "./HomeScreen";
import LoginForm from "./LoginForm";
import "./style/Styles.css";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomeScreen/>}/>
        <Route path="/" element={<LoginForm/>}/>
      </Routes>
    </div>
  );
}
