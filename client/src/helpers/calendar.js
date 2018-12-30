function buildCalendar(month, year){
  let date = `${month} 1, ${year} 01:00:00`;
  const first_day = new Date(date);
  const current_date = new Date(date);

  let first_week, second_week, third_week, fourth_week, fifth_week, sixth_week;
  let current_day;

  first_week = [];
  second_week = [];
  third_week = [];
  fourth_week = [];
  fifth_week = [];
  sixth_week = [];

  current_day = first_day.getDay();

  // first week
  for(let i=0; i<=6; i++) {
    if(current_day<=6){
      first_week.push(
        {
          'day': current_date.getDate(),
          'month': current_date.getMonth(),
          'year': current_date.getYear()
        }
      );
      current_date.setDate(current_date.getDate()+1);
      current_day++;
    } else {
      first_day.setDate(first_day.getDate()-1);
      first_week.unshift(
        {
          'day': first_day.getDate(),
          'month': first_day.getMonth(),
          'year': first_day.getYear()
        }
      );
    }
  }

  // second, third and fourth week
  function full_week(arr){
    for(let i=0; i<=6; i++){
      arr.push(
        {
          'day': current_date.getDate(),
          'month': current_date.getMonth(),
          'year': current_date.getYear()
        }
      );
      current_date.setDate(current_date.getDate()+1);
    }
    return arr
  }

  second_week = full_week(second_week);
  third_week = full_week(third_week);
  fourth_week = full_week(fourth_week);

  // fifth_week
  for(let i=0; i<=6; i++){
    if(i===0 && current_date.getDate()===1){
      break;
    } else {
      fifth_week.push(
        {
          'day': current_date.getDate(),
          'month': current_date.getMonth(),
          'year': current_date.getYear()
        }
      );
      current_date.setDate(current_date.getDate()+1);
    }
  }

  // sixth_week
  for(let i=0; i<=6; i++){
    if(i===0 && current_date.getDate() <= 7){
      break;
    } else {
      sixth_week.push(
        {
          'day': current_date.getDate(),
          'month': current_date.getMonth(),
          'year': current_date.getYear()
        }
      );
      current_date.setDate(current_date.getDate()+1);
    }
  }

  let output = [
    first_week,
    second_week,
    third_week,
    fourth_week
  ]
  if(fifth_week.length > 0){
    output.push(fifth_week);
  }
  if(sixth_week.length > 0){
    output.push(sixth_week);
  }

  return output
}

export default buildCalendar;
