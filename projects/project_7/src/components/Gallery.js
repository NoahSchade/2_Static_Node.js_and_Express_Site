import React from 'react';
import Heading from './Heading';
import DefaultGalleryItems from './DefaultGalleryItems';
import SearchGalleryItems from './SearchGalleryItems';

// In the "Gallery" component, if there are images for a custom search or a default search, then display the heading. Otherwise remove the heading.
// If one of the default buttons are selected or the URL matches one of the default paths, then use the "DefaultGalleryItems" component. Otherwise use the "SearchGalleryItems" component for custom searches.
// Both the "DefaultGalleryItems" component and the "SearchGalleryItems" are used to display a list of images or the "No Results Found" message in between the "ul" tags.
const Gallery = (props) => {
  return (
    <div className="photo-container">
    {props.total > 0 ? <Heading subject={props.subject} /> : ''}
      <ul>
        { props.subject === "Cat" || props.subject === "Dog" || props.subject === "Laptop" ? <DefaultGalleryItems data={props.data} total={props.total} subject={props.subject} /> : <SearchGalleryItems data={props.data} total={props.total} subject={props.subject} /> }
      </ul>
    </div>
  );
}

export default Gallery;