import React from 'react';
import Navigation from './Navigation';
import {ip} from "../network";
import "../styles/darkmode.css";
import RunPopup from "./RunPopup"
const axios = require('axios');

export default class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'',
      password:'',
      shouldDisplay:false,
      authenticated: this.props.authenticated,
      pending:[ ],
      showPopup: false,
        };
    this.pullData = this.pullData.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidMount(){
    this.props.autoLogin();
    this.pullData();
  }

  pullData(){
    axios.post("http://"+ip+'/othscmsbackend/get_pending.php', {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      this.setState({pending:result.data});
    }).catch(error => console.log(error));
  }

  render(){
    let list = this.state.pending;
    return(
      <div>
      <Navigation />
        <div>
          <h1>Grade</h1>

        {this.state.showPopup && <RunPopup closePopup = {this.togglePopup} id = {this.state.curId}/>}

          <table class = "container">
                    <tr>
                        <th>Team</th>
                        <th>Problem</th>
                        <th>Run</th>
                    </tr>
                    {
                        list.length >=1 && list.map(item =>
                            <tr>
                                <td>{item.user}</td>
                                <td>{item.problemName}</td>
                                <td><input type = "submit" value = "RUN" onClick = {() =>
                                    {
                                        this.setState({curId: item.id});
                                        this.togglePopup();
                                    }
                                    }/></td>
                            </tr>
                        )
                    }
                </table>
        </div>
      </div>
    );
  }
}
