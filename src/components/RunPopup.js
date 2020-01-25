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
        code: '',
        output: '',
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
            output: result.data.output,
            code: result.data.code,
          });
          console.log(result.data);
      }).catch(error => console.log(error));
    }

    render() {

      return (
        <div  className='popup'>
          <div class="codeFile" className='popup_left'>

              <button onClick={this.props.closePopup}>close me</button>
              {/* <h2>{this.state.filePath}</h2>
              <h2>{this.state.systemTime}</h2>
              <h2>{this.state.team}</h2> <h2>{ans}</h2>
              <h2> {this.state.code}</h2>

              */}

            {this.state.code && this.state.code.map(line => <div class="codeFile"> <p>&#09;{line}</p></div> )}


          </div>
          <div className='popup_right'>
            {this.state.output && this.state.output.map(line => <div class="codeFile"> <p>&#09;{line}</p></div> )}
          </div>
        </div>


      );
    }
  }
