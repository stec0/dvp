import React, { Component } from 'react';
import MainMenu from '../components/MainMenu.js';
import Calendar from '../components/Calendar.js';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return  <div>
              <MainMenu />
              <Calendar />
            </div>;
  }
}

export default MainContainer;
