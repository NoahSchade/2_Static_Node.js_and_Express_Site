import React, { Component } from 'react';
import Loading from './Loading_2.gif';

class SearchGalleryItems extends Component {

  constructor(props) {
    super(props);

    this.notFoundCounter = 0;
    this.imageItems = [];

    // Stores an array with data for each image into the "imageItems" array.
    // When there is a URL with a farm of 0, reject it because it causes an error and doesn't display an image.
    [this.props.data][0].map((image) => {
      if(image.farm !== 0){
        return (
          this.imageItems.push(
            [
              image.id,
              `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
            ]
          )
        )
      } else {
        return (
          ''
        )
      }
    });

    // The "images" state contains a "Loading" gif which is only displayed in the place of each main image that has not fully loaded yet.
    // It also contains the main images.
    // The number 1 stands for the src of the images.
    this.state = {
      images: this.imageItems.map(image => ({
        ...image,
        1: Loading
      }))
    }
  }

  componentDidMount() {
    this.state.images.forEach((image, index) => {
      const src = this.imageItems[index][1] // get image primary src
      const primaryImage = new Image() // create an image object programmatically
      primaryImage.onload = () => {
        const images = [...this.state.images] // copy images array from state
        images[index][1] = src // adjust loaded image src
        this.setState({
          images
        })
      }
      primaryImage.src = src // do it after you set onload handler
    })
  }

  render(){
    // Store image data into listPhotos.
    // "image[0]" is the id.
    // "image[1]" is the URL.
    const listPhotos = this.state.images.map(image => (
      <li key={image[0]}>
        <img src={image[1]} alt={this.props.subject} />
      </li>
    ));

    // This code block checks whether there are images are not. If there is none add one to the "this.notFoundCounter".
    if(this.props.total !== 0) {
      this.notFoundCounter = 0;
    } else {
      this.notFoundCounter++;
    }

    // If there are no images for the current search and the "this.notFoundCounter" has a value of 1 then add the "No Results Found" message.
    // The "this.notFoundCounter" is used to make sure there are not 2 or more "No Results Found" messages displaying at the same time.
    if(this.props.total === 0){
      if(this.notFoundCounter === 1){
        this.imageItems.push(
          // Not Found
          <li key="Not Found" className="not-found">
            <h3>No Results Found</h3>
            <p>Your search did not return any results. Please try again.</p>
          </li>
        )
      } else if(this.notFoundCounter > 1) {
          this.imageItems.push(
            null
          )
      }

      // return the "No Results Found" message if there are no images.
      const listPhotos = this.imageItems;
      return listPhotos;
    };
  
    // return the list of images or the "No Results Found" message if there are no images.
    return listPhotos;
  }
}

export default SearchGalleryItems;