// Imports that make app function
import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import axios from 'axios';

// Import that adds styling to the app
import '../css/style.css';

// Import Components
import apiKey from '../other/config.js';
import Header from './Header';
import Gallery from './Gallery';
import NotFound from './NotFound';
import LoadingPage from './LoadingPage';


export default class extends Component {

  constructor() {
    super();

    // Code used to format a string that is used to request data from Flickr in the "searching" function and it is also used to format the subject in the "reformatSubject" function.
    this.regexPercent = /%20/g;
    this.replacementCross = '+';
    this.regexZero = /^0$/;
    this.replacementZero = ' 0';
    this.replacementSpace = ' ';
    this.regexSpecial = /[^a-zA-Z0-9-' '-+]/g;
    this.replacementBlank = '';

    // this.display keeps track of whether to display the gallery images and heading or the LoadingPage component.
    this.display = false;

    // this.activate keeps track of whether to forceUpdate twice or not.
    this.activate = 0;
    
    // These states stores data from the response from Flickr.
    this.state = {
      cats: [],
      dogs: [],
      laptops: [],
      custom: [],
      catsTotal: [],
      dogsTotal: [],
      laptopsTotal: [],
      searchingTotal: []
    };

    // When the anchor part of the URL changes execute the searching function and the activator function.
    window.addEventListener("hashchange", e => {
      this.activator();
      this.searching();
    });
  }

  // This function helps change the page when the anchor part of the URL changes.
  activator = () => {
    this.activate++;
    if(this.activate <= 1){
      this.forceUpdate();
      this.forceUpdate();
    }
  }

  // Execute these functions in order to retrieve data from Flickr.
  componentDidMount() {
    this.catSearch();
    this.dogSearch();
    this.laptopSearch();
    this.searching();
  }

  // Request and store data for the "/cat" path when the app first loads.
  catSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cat&per_page=24&page=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        cats: response.data.photos.photo,
        catsTotal: Number(response.data.photos.total)
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }
  
  // Request and store data for the "/dog" path when the app first loads.
  dogSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dog&per_page=24&page=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        dogs: response.data.photos.photo,
        dogsTotal: Number(response.data.photos.total)
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  // Request and store data for the "/laptop" path when the app first loads.
  laptopSearch = () => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=laptop&per_page=24&page=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
        laptops: response.data.photos.photo,
        laptopsTotal:  Number(response.data.photos.total)
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  // Request and store data for the "/:search" path when the app first loads and when the anchor part of the URL changes.
  // Do not fetch data with a window.location.hash ("#/0") which causes an error.
  // When a response comes back from Flickr, set this.display to true to end the loading page and show the images.
  searching = () => {
    if(window.location.hash !== "#/0"){
      this.string = window.location.hash;
      this.reformatZero = this.string.replace(this.regexZero, this.replacementZero);
      this.reformatSpace = this.reformatZero.replace(this.regexPercent, this.replacementCross);
      this.reformatSpecial = this.reformatSpace.replace(this.regexSpecial, this.replacementBlank);
      this.reformattedString = this.reformatSpecial;
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.reformattedString}&per_page=24&page=1&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          custom: response.data.photos.photo,
          searchingTotal:  Number(response.data.photos.total),
          display: this.display = true
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
    }
  }

  // Reformat subject when the "reformatSubject" function is called by the "/:search" path.
  reformatSubject = () => {
    this.string = window.location.hash;
    this.reformatSpace = this.string.replace(this.regexPercent, this.replacementSpace);
    this.reformatSpecial = this.reformatSpace.replace(this.regexSpecial, this.replacementBlank);
    this.reformattedSubject = this.reformatSpecial;
  }

  // The Header component contains the default navigation buttons and the search bar.
  // The Header component is passed a "searching" prop, so when a user submits what is in the search bar the "searching" funtion is called.
  // The Gallery component contains the heading and images.
  // The LoadingPage component contains the loading page.
  // Redirect away from the "/" path to the "/cat" path to display cat photos.
  // Redirect away from the "/0" path because that path does not return any data that helps display images.
  // The "data" props passed to the Gallery component gives the component data from the response from Flickr. This data helps generate the images.
  // The "total" props keeps track of whether the search on a particular subject has images or not. If not then the heading is removed and a "No Results Found" message is shown to the user.
  // The "subject" props is used to display letters and/or numbers and/or dashes in the heading depending on what was searched for.
  // The "subject" props is also used for the image "alt" attributes.
  // Call "reformatSubject" when user is on the "/:search" path.
  // "this.activate" helps change the page when the anchor part of the URL changes.
  // If this.display is true when the user is on the "/:search" path, remove the loading page and display the heading and gallery images or the "No Results Found" message. Otherwise remove the heading and images or the "No Results Found" message and display the loading page.
  // If none of the paths listed below match the URL path specified like "/laptop/bag" then the user will recieve a "404 error: Page Not Found".
  render(){
    return(
      <HashRouter>
        <div className="container">
            <Header />
            <Switch>
              <Route exact path="/" render={ () => <Redirect to="/cat" /> } />
              <Route exact path="/0" render={ () => <Redirect to="/%200" /> } />
              <Route exact path="/cat" render={ () => <Gallery data={this.state.cats} total={this.state.catsTotal} subject="Cat" {...this.display = false} /> } />
              <Route exact path="/dog" render={ () => <Gallery data={this.state.dogs} total={this.state.dogsTotal} subject="Dog" {...this.display = false} /> } />
              <Route exact path="/laptop" render={ () => <Gallery data={this.state.laptops} total={this.state.laptopsTotal} subject="Laptop" {...this.display = false} /> } />
              <Route exact path="/:search" render={ () => this.display ? <Gallery data={this.state.custom} total={this.state.searchingTotal} {...this.reformatSubject()} subject={this.reformattedSubject} {...this.activate === 0 ? this.display = true : this.display = false } /> : <LoadingPage /> } />
              <Route component={NotFound} />
            </Switch> 
        </div>
      </HashRouter>
    )
  }
}