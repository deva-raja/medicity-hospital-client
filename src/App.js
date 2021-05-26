import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/style.css';
import AppointmentPage from './pages/AppointmentPage';
import ContactPage from './pages/ContactPage';
import CovidPage from './pages/CovidPage';
import LandingPage from './pages/LadingPage';
import LocationPage from './pages/LocationPage';
import PersonelPage from './pages/PersonelPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/covid' component={CovidPage} />
          <Route path='/personel' component={PersonelPage} />
          <Route path='/locations' component={LocationPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/appointment' component={AppointmentPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
