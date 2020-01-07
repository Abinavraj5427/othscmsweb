import React from 'react';
import "../styles/popup.css";
import {ip} from "../network";
const axios = require('axios');

export default class RunPopup extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        filePath: '',
        systemTime: '',
        team: '',
      }
      this.collectProblemData = this.collectProblemData.bind(this);
    }

    componentDidMount(){
      this.collectProblemData();
    }

    collectProblemData(){
      axios.post("http://"+ip+'/othscmsbackend/problemdata.php',
      {
        id: this.props.id,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }).then(result=>{
        this.setState(
          {
            filePath: result.data.filePath,
            systemTime: result.data.systemTime,
            team: result.data.team,
            code: result.data.code,
          });
        console.log(result)
      }).catch(error => console.log(error));
    }

    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            {/*}<h2>{this.state.filePath}</h2>
            <h2>{this.state.systemTime}</h2>
            <h2>{this.state.team}</h2>*/}
            <p>{this.state.code}</p>
            <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }
