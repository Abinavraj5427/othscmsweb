import React from 'react';
import "../styles/popup.css";

export default class RunPopup extends React.Component {
    constructor(props){
      super(props);

    }
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1>{this.props.id}</h1>
            <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }