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
        code: [],
        description: '',
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
      }).catch(error => console.log(error));
    }

    render() {

      return (
        <div  className='popup'>
          <div class="codeFile" className='popup_inner'>

          <button onClick={this.props.closePopup}>close me</button>
          <select>
              <option value="None">NONE</option>
              <option value="Runtime Error">RUNTIME ERROR</option>
              <option value="Compilation Error">COMPILATION ERROR </option>
              <option value="Incorrect Output">INCORRECT OUTPUT </option>
          </select>

          {this.state.code && this.state.code.map(line => <div class="codeFile"> <h1>{line}</h1></div> )}


              

            
          </div>
        </div>
      );
    }
  }
