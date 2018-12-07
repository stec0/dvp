import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import buildCalendar from '../../helpers/calendar.js';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const days = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi'
]

const styles = {
  monthHover: {
    background: 'rgba(0, 0, 0, 0.2)'
  },
  monthNotHover: {
    background: 'rgba(0, 0, 0, 0.3)'
  },
  notMonthHover: {
    background: 'rgba(0, 0, 0, 0.4)'
  },
  notMonthNotHover: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3)
];

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      month: 'December',
      year: '2012',
      weekHovered: 0,
      day: 0
    }
  }

  onHover(week, day) {
    var self = this;
    return(
      function() {
        self.setState(
          {
            weekHovered: week,
            dayHovered: day
          }
        );
      }
    )
  }

  render() {
    var self = this;
    var calendar = buildCalendar(this.state.month, this.state.year);
    console.log(calendar);

    let rows = [];
    for(var i=0; i<calendar.length; i++) {
      let index = i;
      rows.push(
        <TableRow key={i}>
          {
            calendar[i].map(
              function(day) {
                let styleHover = styles.monthHover;
                let styleNotHover = styles.monthNotHover;
                if(index == 0 && day > 7) {
                  styleHover = styles.notMonthHover;
                  styleNotHover = styles.notMonthNotHover;
                } else if(index == 0 && day <= 7) {
                  styleHover = styles.monthHover;
                  styleNotHover = styles.monthNotHover;
                } else if(index == calendar.length - 1 && day <= 7) {
                  styleHover = styles.notMonthHover;
                  styleNotHover = styles.notMonthNotHover;
                } else {
                  styleHover = styles.monthHover;
                  styleNotHover = styles.monthNotHover;
                }
                return(
                    <TableCell
                        onMouseOver={self.onHover(index, day)}
                        style={self.state.weekHovered == index && self.state.dayHovered == day ? styleNotHover: styleHover}>
                      {day}
                    </TableCell>
                )
              }
            )
          }
        </TableRow>
      )
    }

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {days.map(day => {
                return (
                  <TableCell> {day} </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Calendar;
