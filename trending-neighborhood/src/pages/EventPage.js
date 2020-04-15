import React, { Component } from 'react';
import backendAPI from '../api/backendAPI';
import { Media, Pagination } from 'react-bootstrap';
import moment from 'moment'

class EventPage extends Component {
  state = {
    city: "",
    events: null,
    isLoading: true,
  }

  componentDidMount() {
    console.log(this.props.location.city)
    this.setState({
      city: "Chicago"
    })
    this.getEvents("Chicago")
  }

  // componentWillUnmount(){
  //   this.setState({
  //     isLoading: true
  //   })
  // }

  getEvents = async (city) => { 
    let results = await backendAPI.getCityEvents(city)   
    // const results = top5neighborhoods //Comment out line when running API and uncomment the above lines
    // console.log(results)
    this.setState({
      results: results,
      isLoading: false,
      isDefault: false
    })
  }




  render() {
    console.log(this.state.results)
    if (this.state.isLoading) {
      return (
        <h1>Loading...</h1>
      )
    }
    // sort the events by date
    let sortedEvents = this.state.results.sort((a,b) =>  new Date (a.date).getTime()-new Date(b.date).getTime())
    let active = 1
    return (
      <div id="event-page">
        {/* <Pagination> */}
        {sortedEvents.map((event, index) => {
          // console.log(event)
          // Loops through to pick out an image that has a "16_9" aspect ratio
          let image = event.images[0].url
          for (let i = 0; i < event.images.length; i++){
            if (event.images[i].ratio === "16_9"){
              image = event.images[i].url
              break;
            }
          }
          let href = "https://www.google.com/maps/place/" + event.address + ",+" + event.city + ",+" + event.state + event.zip
          href = href.replace(/ /g, "%20")
          let links = document.getElementsByClassName("dynamicLink")
          for (var i = 0; i < links.length; i++) {
            links[i].href = href;
            links[i].innerHTML = href.replace('http://',"");
         }
         console.log(links)
          // console.log(formattedMapLink)
          return (
            // <Pagination.Item key={index} active={index === active}>
              <Media 
                id="media-container"
                key={index}
                >
              <img
                id="media-image"
                src={image}
                alt={event.images[0].url} 
                style={{
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  height: '100%', 
                }}
              />
              <Media.Body>
                <p>{moment(`${event.date}, ${event.time}`).format('llll')}</p>
                <h5>Event Title Here</h5>
                <a href="link" className="dynamicLink">
                {links[index]}
                </a>
                <a href={event.eventUrl}>Tickets to this event</a>
              </Media.Body>
            </Media>
          // </Pagination.Item>
        )
      })}
      {/* </Pagination> */}
      </div>
    )
  }
}

export default EventPage;