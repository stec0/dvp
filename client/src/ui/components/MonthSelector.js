import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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

class MonthSelector extends React.Component {
  handleBackButtonClick = event => {
    let index = months.indexOf(this.props.month) === 0 ? 11 : months.indexOf(this.props.month) - 1
    let year = months.indexOf(this.props.month) === 0 ? this.props.year - 1 : this.props.year
    this.props.onChangeMonth(months[index], year);
  };

  handleNextButtonClick = event => {
    let index = months.indexOf(this.props.month) === 11 ? 0 : months.indexOf(this.props.month) + 1
    let year = months.indexOf(this.props.month) === 11 ? this.props.year + 1 : this.props.year
    this.props.onChangeMonth(months[index], year);
  };

  render() {
    return (
      <div>
        <IconButton onClick={this.handleBackButtonClick} aria-label="Previous Month">
          <KeyboardArrowLeft />
        </IconButton>
        {this.props.month + ' ' + this.props.year}
        <IconButton onClick={this.handleNextButtonClick} aria-label="Next Month">
          <KeyboardArrowRight />
        </IconButton>
      </div>
    );
  }
}

export default MonthSelector;
