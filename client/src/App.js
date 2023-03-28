import './App.css';
import {Switch, Route} from "react-router-dom"
import { useLocation } from 'react-router-dom';
import Landing from './components/landing/landing'
import Error from './components/error/error'
import Home from "./components/home/home"
import NavBar from './components/navBar/navBar'
import Form from './components/formCreateActivity/form'
import CountryDetail from './components/countryDetail/detail'
// import Activities from './components/activities/activities'

function App() {
  const location = useLocation()
  return (
    <div className="App">

      {location.pathname !== "/" && <NavBar/>}
      <Switch>
        <Route exact path="/"> <Landing /> </Route>
        <Route exact path="/home"> <Home/> </Route>
        <Route exact path = "/createActivity"> <Form/> </Route>
        <Route exact path = "/countries/:id"><CountryDetail/></Route>
        {/* <Route exact path = "/activities"> <Activities/> </Route> */}
        <Route path="*"> <Error /></Route>


      </Switch>
    
    </div>

  )
}

export default App;
