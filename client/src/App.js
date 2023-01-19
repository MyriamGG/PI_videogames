import './App.css';
import LandingPage from './controllers/LandingPage';
import Get_All_Videos from './controllers/Get_All_Videos';
import VideoDetail from './controllers/VideoDetail';
import Form from './controllers/Form';
import Home from './controllers/Home';
import Video from './controllers/Video'
import {Route} from 'react-router-dom';
import SearchBar from './controllers/SearchBar';

function App() {
  return (
    <>
      <div className="margenes"> 
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/search">
          <SearchBar/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/video">
          <Video />
        </Route>
        <Route path='/getAllVideos'>
          <Get_All_Videos/>
        </Route>
        <Route path="/videoDetail/:id" component={VideoDetail}/> 
        <Route path="/form">
          <Form/>
        </Route>

      </div>
    </>
  );
}

export default App;
