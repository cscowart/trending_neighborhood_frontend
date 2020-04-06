import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <div>
            <NavBar />
            <hr />
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path="/articles/:articleID" component={ArticlePage} />
            <Route exact path="/sections/:sectionID" component={SectionPage} />
            <Route exact path="/add-article" component={AddArticlePage} />
            <Route exact path="/login" component={LoginPage} /> */}
          </div>
        </Router>
    </div>
  );
}

export default App;
