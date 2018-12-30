import React, { Component } from 'react';

import MainMenu from '../components/MainMenu.js';
import MonthSelector from '../components/MonthSelector.js';
import Calendar from '../components/Calendar.js';
import Login from '../components/Login.js';
import ConfirmReservation from '../components/ConfirmReservation.js';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: months[(new Date(Date.now())).getMonth()],
      year: (new Date()).getFullYear(),
      view: 'calendar'
    }
  }

  onChangeMonth = (month, year) => {
    this.setState(
      {
        month: month,
        year: year
      }
    )
  }

  changeView = (view) => {
    this.setState({ view });
  };

  render () {
    let {month, year, view} = this.state;
    return (
      <div>
        <MainMenu />
        {
          (
            () => {
              switch(view) {
                case 'calendar':
                  return (
                    <div>
                      <MonthSelector onChangeMonth={this.onChangeMonth} month={month} year={year}/>
                      <Calendar month={month} year={year}/>
                    </div>
                  )
                case 'login':
                  return (
                    <div>
                      <Login />
                    </div>
                  )
                case 'confirm':
                  return (
                    <div>
                      <ConfirmReservation />
                    </div>
                  )
              }
            }
          )()
        }
      </div>
    );
  }
}

export default MainContainer;
