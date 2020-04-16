import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import backendAPI from '../api/backendAPI';
import { FormControl, FormGroup, Media, Pagination } from 'react-bootstrap';
import moment from 'moment'
// import ReactLoading from 'react-loading';

class EventPage extends Component {
  state = {
    city: "",
    events: null,
    isLoading: true,
    userInput: "",
  }

  componentDidMount() {
    let path = window.location.pathname.split('/')
    let city = path[2].replace(/%20/g, " ")
    console.log(city)
    // Checks to see what city was selected on the main landing page
    // if (this.props.location.city){
    //   this.setState({
    //     city: this.props.location.city,
    //     isLoading: true,
    //   })
    //   this.getEvents(this.props.location.city)
    // } else if (city){
      if (city) {
      this.setState({
        city: city,
        isLoading: true,
      })
      this.getEvents(city)
    }
  }

  // componentDidUpdate(prevProps) {
  //   // console.log(prevProps.match.url)
  //   // console.log(window.location.pathname.replace(/%20/g, " "))
  //   // let sanitized
  //   if (prevProps.match.url != window.location.pathname.replace(/%20/g, " ")){
  //     console.log("I changed!")
  //     window.location.reload()
  //     }
  //   }


  // componentWillUnmount(){
  //   this.setState({
  //     isLoading: true
  //   })
  // }

  getEvents = async (city) => {
    let results = await backendAPI.getCityEvents(city)
    this.setState({
      results: results,
      isLoading: false,
      isDefault: false
    })
  }


  // handleSearch = async (event) => {
  //   let userInput = event.target.value
  //   if (userInput !== '') {
  //     let response = await backendAPI.searchEvents(this.state.city, userInput)
  //     console.log(response)
  //     this.setState({
  //       events: response
  //     })
  //   }
  // }



  render() {
    if (this.state.isLoading) {
      return (
        <div >
          {/* <ReactLoading className='react-loading' type={'bars'} color={'blue'} height={'20%'} width={'20%'} /> */}
        </div>
      )
    }
    // sort the events by date
    let sortedEvents = this.state.results.sort((a,b) =>  new Date (a.date).getTime()-new Date(b.date).getTime())

    let active = 1
    return (
      <div id="event-page">
        {/* <FormGroup>
          <FormControl onChange={this.handleSearch} type="text" placeholder="Search" />
        </FormGroup> */}
        {sortedEvents.map((event, index) => {
        // {sortedEvents.filter(something=>something.includes(`'${this.state.userInput}'`)).map((event, index) => {
          // Loops through to pick out an image that has a "16_9" aspect ratio
          let image = event.images[0].url
          for (let i = 0; i < event.images.length; i++){
            if (event.images[i].ratio === "16_9"){
              image = event.images[i].url
              break;
            }
          }
          let url = "https://www.google.com/maps/place/" + event.address + ",+" + event.city + ",+" + event.state + "%20" + event.zip
          url = url.replace(/ /g, "%20")
          return (
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
                <h5>{event.eventName}</h5>
                <div id="address-tickets-div">
                  <a href={url} id="event-address">
                    {event.address}<br/> {event.city}, {event.state} {event.zip}
                  </a>
                  <a href={event.eventUrl} id="event-link">Tickets to this event</a>
                </div>
              </Media.Body>
            </Media>
        )
      })}
      </div>
    )
  }
}

export default EventPage;