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
      showMenu: false,

        };
    this.pullData = this.pullData.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {

    if (!this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });

    }
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
                        <th>Status</th>
                        <th>Run</th>

                        <th>Description</th>

                    </tr>
                    {
                        list.length >=1 && list.map(item =>
                            <tr>
                                <td>{item.user}</td>
                                <td>{item.problemName}</td>
                                <select>
                                  <option value="PENDING">PENDING</option>
                                  <option value="CORRECT">CORRECT</option>
                                  <option value="INCORRECT">INCORRECT</option>
                                </select>


                                <td><input type = "submit" value = "RUN" onClick = {() =>
                                    {
                                        this.setState({curId: item.id});
                                        this.togglePopup();
                                    }
                                    }/>
                                </td>
                                <select>
                                  <option value="None">NONE</option>
                                  <option value="Runtime Error">RUNTIME ERROR</option>
                                  <option value="Compilation Error">COMPILATION ERROR </option>
                                  <option value="Incorrect Output">INCORRECT OUTPUT </option>
                                </select>
                                
                            </tr>
                        )
                    }
                </table>
        </div>
      </div>
    );
  }
}
