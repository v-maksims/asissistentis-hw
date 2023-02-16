import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/Navigation';
import AudioPage from './pages/AudioPage';
import AvatarPage from './pages/AvatarPage';
import HomePage from './pages/HomePage';
import 'react-toastify/dist/ReactToastify.css';

function App () {
    return (
        <>
            <div className="container">
                <Navigation
                    to='/'
                    label='home'
                />
                <Navigation
                    to='/avatar'
                    label='avatar'
                />
                <Navigation
                    to='/audio'
                    label='audio'
                />

                <Routes>
                    <Route path='/' element={ <HomePage/> }/>
                    <Route path='/avatar' element={ <AvatarPage/> }/>
                    <Route path='/audio' element={ <AudioPage/> }/>
                </Routes>
                <ToastContainer/>
            </div>
        </>
    );
}

export default App;
