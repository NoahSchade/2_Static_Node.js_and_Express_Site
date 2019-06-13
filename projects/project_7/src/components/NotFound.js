import React from 'react';

// If none of the paths in the App.js component match the URL path specified like "/laptop/bag" then the user will recieve a "404 error: Page Not Found".
const NotFound = () => (
  <div className="error-404-not-found">
    <i className="material-icons icn-error">error_outline</i>
    <h2 className="page-not-found">404 error: Page Not Found</h2>
  </div>
);

export default NotFound;