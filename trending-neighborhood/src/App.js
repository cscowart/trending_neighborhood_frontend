import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
// Pages
import HomePage from './pages/HomePage'
// Components
// import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
        <Router>
          <div>
            {/* <NavBar /> */}
            <hr />
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path="/preferences/:cityID" component={NeighborhoodPreferencesPage} /> */}
            {/* <Route exact path="/sections/:sectionID" component={SectionPage} />
            <Route exact path="/add-article" component={AddArticlePage} />
            <Route exact path="/login" component={LoginPage} /> */}
          </div>
        </Router>
    </div>
  );