import React, { Component } from 'react';

class Galleryitem extends Component {
  render(){

    // Stores data for each image into the "imageItems" array.
    // When there is a URL with a farm of 0, reject it because it causes an error and doesn't display an image.
    const imageItems = [];
    [this.props.data][0].map((image) => {
      return (
        imageItems.push(
          image.farm !== 0 ? (
          <li key={image.id}>
            <img src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} alt={this.props.subject} />
          </li>
          ) : '' 
        )
      )
    });
    
    // If no images are returned, then display a no results found message.
    if(this.props.total === 0){
      imageItems.push(
        <li key="Not Found" className="not-found">
          <h3>No Results Found</h3>
          <p>Your search did not return any results. Please try again.</p>
        </li>
      )
    };

    // imageItems array is returned. It's contents are placed inside the ul tags of the "Gallery.js" component.
    return imageItems;
  }
}

export default Galleryitem;