import React, { Component } from 'react';

// import the component "withRouter" to make "this.props.history.push(this.pathReformatted)" work.
import { withRouter } from 'react-router-dom';

class Form extends Component {

  constructor() {
    super();

    // This code is used to reformat the string obtained from the current anchor part of the URL and the previous one.
    this.regexPercent = /%20/g;
    this.replacementSpace = ' ';
    this.regexSpecial = /[^a-zA-Z0-9-' ']/g;
    this.replacementBlank = '';
    this.regexZero = /^0$/;
    this.replacementZero = ' 0';

    // Stores the characters entered into the search bar.
    this.state = {
      value: ''
    };
  }

  // Every time a user types a character into the search bar, update the "value" state.
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  // The "handleSubmit" method uses event.preventDefault() to make sure the page does not refresh.
  // When the form is being submitted, the "path" variable is set to the characters in the form.
  // Then, the "path" variable is reformatted and stored into "this.pathReformatted". For example, if this is entered into the search bar and submitted "guy%20likes %*&+^vacation" it would be reformatted to "guy likes vacation".
  // "this.hashZero" is reformatted in the same way as the "path" variable.
  // The anchor part of the URL cannot change if the previous submit is the same as the current submit. That way the page doesn't reload the same photos when the same search is entered twice in a row.
  // "this.props.history.push(this.pathReformatted)" changes the path of the URL to what was entered and submitted in the search bar.
  handleSubmit = (event) => {
    event.preventDefault();
    let path = this.state.value;
    this.reformatZero = path.replace(this.regexZero, this.replacementZero);
    this.pathReformatPercent = this.reformatZero.replace(this.regexPercent, this.replacementSpace);
    this.pathReformatted = this.pathReformatPercent.replace(this.regexSpecial, this.replacementBlank);
    this.hashZero = window.location.hash.replace(this.regexZero, this.replacementZero);
    this.hashPercent = this.hashZero.replace(this.regexPercent, this.replacementSpace);
    this.hashPath = this.hashPercent.replace(this.regexSpecial, this.replacementBlank);
    if(this.pathReformatted !== this.hashPath){
      this.props.history.push(this.pathReformatted);
    }
  }

  // Create the search bar.
  // Every time a user types in a character, the onChange attribute calls the "handleChange" function. Which updates the "value" state to what is entered in the search bar.
  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input type="search" name="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} required/>
        <button type="submit" className="search-button">
          <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </form>
    );
  }
}

export default withRouter(Form);