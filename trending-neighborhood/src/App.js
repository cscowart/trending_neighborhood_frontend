import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Pages
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
// Components
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/explore" component={ExplorePage} />
            {/* <Route exact path="/sections/:sectionID" component={SectionPage} />
            <Route exact path="/add-article" component={AddArticlePage} />
            <Route exact path="/login" component={LoginPage} /> */}
          </div>
        </Router>
    </div>
  )
}

export default App