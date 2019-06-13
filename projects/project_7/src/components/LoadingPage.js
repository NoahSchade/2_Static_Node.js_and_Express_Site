import React from 'react';
import LoadingPage from './LoadingPage.gif';

// Displays a loading page when the user sends a get request and hasn't gotten a response from Flickr yet.
const Loading = () => {
  return (
    <img src={LoadingPage} alt='' style={{height: "200px"}}></img>
  );
}

export default Loading;