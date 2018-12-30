import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import buildCalendar from '../../helpers/calendar.js';

const days = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi'
]

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

const styles = {
  monthHover: {
    opacity: '1'
  },
  monthNotHover: {
    opacity: '0.6'
  },
  notMonthHover: {
    opacity: '0.5'
  },
  notMonthNotHover: {
    opacity: '0.2'
  },
  reserved: {
    backgroundColor: 'red'
  },
  notReserved: {
    backgroundColor: 'grey'
  },
  onGoingReserved: {
    backgroundColor: 'orange'
  }
}

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hoveredDay: 0,
      hoveredMonth: 0,
      hoveredYear: 0,
      reserved: false,
      ongoingReservation: false,
      ongoingReservedDay: 0,
      ongoingReservedMonth: 0,
      ongoingReservedYear: 0,
      reservations: []
    }
  }

  onHover = (date) => {
    return(
      () => {
        this.setState(
          {
            hoveredDay: date.day,
            hoveredMonth: date.month,
            hoveredYear: date.year
          }
        );
      }
    )
  }

  onHoverOut = () => {
    this.setState(
      {
        hoveredDay: 0,
        hoveredMonth: 0,
        hoveredYear: 0
      }
    );
  }

  makeReservation = (date) => {
    return (
      () => {
        if(!this.state.ongoingReservation) {
          this.setState(
            {
              ongoingReservation: true,
              ongoingReservedDay: date.day,
              ongoingReservedMonth: date.month,
              ongoingReservedYear: date.year
            }
          );
        } else {
          let newReservation;
          let firstDate = new Date(this.state.ongoingReservedDay + ' ' + months[this.state.ongoingReservedMonth] + ' ' + this.state.ongoingReservedYear + ' 01:00:00');
          let lastDate = new Date(date.day + ' ' + months[date.month] + ' ' + date.year + ' 01:00:00');
          if(firstDate <= lastDate) {
            newReservation = {
              startDate: firstDate,
              endDate: lastDate
            }
          } else {
            newReservation = {
              startDate: lastDate,
              endDate: firstDate
            }
          }

          let reservations = [...this.state.reservations, newReservation];

          this.setState(
            {
              reservations: reservations,
              ongoingReservation: false,
              ongoingReservedDay: 0,
              ongoingReservedMonth: 0,
              ongoingReservedYear: 0
            }
          );
        }
      }
    )
  }

  render() {
    var calendar = buildCalendar(this.props.month, this.props.year);

    let rows = [];
    for(var i=0; i<calendar.length; i++) {
      let index = i;
      rows.push(
        <TableRow key={i}>
          {
            calendar[i].map(
              (date) => {
                // hover opacity styling
                let styleHover, styleNotHover;
                if(index === 0 && date.day > 7) {
                  styleHover = styles.notMonthHover;
                  styleNotHover = styles.notMonthNotHover;
                } else if(index === 0 && date.day <= 7) {
                  styleHover = styles.monthHover;
                  styleNotHover = styles.monthNotHover;
                } else if(index === calendar.length - 1 && date.day <= 7) {
                  styleHover = styles.notMonthHover;
                  styleNotHover = styles.notMonthNotHover;
                } else {
                  styleHover = styles.monthHover;
                  styleNotHover = styles.monthNotHover;
                }
                let hoverStateStyle = this.state.hoveredYear === date.year && this.state.hoveredMonth === date.month && this.state.hoveredDay === date.day ? styleHover : styleNotHover;

                // past reservation styling
                let styleReserved;
                let currentDate = new Date(date.day + ' ' + months[date.month] + ' ' + date.year + ' 01:00:00');
                for(let reservation of this.state.reservations) {
                  if(currentDate >= reservation.startDate && currentDate <= reservation.endDate) {
                    styleReserved = styles.reserved;
                  }
                }

                // ongoing reservation styling
                if(this.state.ongoingReservation) {
                  let hoveredDate = new Date(this.state.hoveredDay + ' ' + months[this.state.hoveredMonth] + ' ' + this.state.hoveredYear + ' 01:00:00');
                  let reservedDate = new Date(this.state.ongoingReservedDay + ' ' + months[this.state.ongoingReservedMonth] + ' ' + this.state.ongoingReservedYear + ' 01:00:00');
                  if((currentDate >= hoveredDate && currentDate <= reservedDate) || (currentDate <= hoveredDate && currentDate >= reservedDate)){
                    styleReserved =  styles.onGoingReserved;
                  }
                }

                styleReserved = styleReserved ? styleReserved : styles.notReserved;

                return (
                    <TableCell
                        onMouseOver={this.onHover(date)}
                        onMouseOut={this.onHoverOut}
                        style={{...hoverStateStyle, ...styleReserved}}
                        onClick={this.makeReservation(date)}
                    >
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        {date.day}
                      </div>
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
