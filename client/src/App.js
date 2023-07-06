import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import Login from './components/Login';
import Sign from './components/Sign';
import { PrivateRoute } from './components/PrivateRoute';
import Movie from './components/Movie';
import Ticket from './components/Ticket';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/sign-up" element={<Sign/>} />
        <Route exact path="/movie" element={<PrivateRoute><Movie/></PrivateRoute>} />
        
        <Route exact path="/ticket" element={<PrivateRoute><Ticket/></PrivateRoute>} />
        </Routes>
    </div>
  );
}

export default App;
