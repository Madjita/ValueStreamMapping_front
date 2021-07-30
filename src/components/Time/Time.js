import React from "react";
import TimeStyle from "./TimeStyle"
import styled from 'styled-components'


const TimeContainer = styled.div`
    background: #808080;
    color: white;
`;

const TimeLable = styled.span`
	font-weight: 300;
	display: flex;
	justify-content: center;
	align-items: center;
    font-size: 0.8rem;
`;

const TimeValue = styled(TimeLable)`
    font-weight: 500;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.1rem;
    box-shadow: none;
    text-transform: uppercase;
    background: rgba(0,0,0,.25);
`;


class Time extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          padding: this.props.padding !== undefined ? this.props.padding : 0,
          time: {
            seconds: Math.floor(Math.random() * 60),
            minutes: Math.floor(Math.random() * 60),
            hours: Math.floor(Math.random() * 24),
            days: Math.floor(Math.random() * 365),
          },
        };
      }

    convertToTimeObj = (dateMillis) => {
        const seconds = Math.floor(dateMillis / 1000) % 60;
        const minutes = Math.floor(dateMillis / (60 * 1000)) % 60;
        const hours = Math.floor(dateMillis / (60 * 60 * 1000)) % 24;
        const days = Math.floor(dateMillis / (24 * 60 * 60 * 1000));
    
        return { seconds, minutes, hours, days };
    }
    
    convertToStrTimeObj = (dateMillis) => {
        const timeObj = this.convertToTimeObj(dateMillis);
        return {
            seconds: timeObj.seconds.toString(),
            minutes: timeObj.minutes.toString(),
            hours: timeObj.hours.toString(),
            days: timeObj.days.toString()
        };
    }
    
    convertToDateMillis = (strTimeObj) => {
        const seconds = parseInt(strTimeObj.seconds) || 0;
        const minutes = parseInt(strTimeObj.minutes) || 0;
        const hours = parseInt(strTimeObj.hours) || 0;
        const days = parseInt(strTimeObj.days) || 0;
        console.log(days,hours,minutes,seconds)
    
        return (((days * 24 + hours) * 60 + minutes) * 60 + seconds) * 1000;
    }

      timeFormatter = (dateMillis) =>
      {
        console.log(dateMillis)
        const timeObj = dateMillis;
        return {
            seconds: (timeObj.seconds < 10 ? '0' : '') + timeObj.seconds.toString(),
            minutes: (timeObj.minutes < 10 ? '0' : '') + timeObj.minutes.toString(),
            hours: (timeObj.hours < 10 ? '0' : '') + timeObj.hours.toString(),
            days: (timeObj.days < 10 ? '0' : '') + timeObj.days.toString()
        };
      }

      changeTextDay = (date) => {
          if(Number(date.days) === 1)
          {
              return "День"
          }
          if(Number(date.days) < 5 && Number(date.days) > 1)
          {
              return "Дня"
          }
          return "Дней"
      }

      changeTextHours = (date) => {
        if(Number(date.hours) === 1)
        {
            return "Час"
        }
        if(Number(date.hours) < 5 && Number(date.hours) > 1)
        {
            return "Часа"
        }
        return "Часов"
    }


      render() {
        const strTimeObj = this.timeFormatter(this.state.time);

        const {padding} = this.state
        return (
           <TimeStyle padding={padding}>
            <TimeContainer>
				<TimeValue>{strTimeObj.days}</TimeValue>
				<TimeLable>{this.changeTextDay(strTimeObj.days)}</TimeLable>
			</TimeContainer>
			<TimeContainer>
				<TimeValue>{strTimeObj.hours}</TimeValue>
				<TimeLable>{this.changeTextHours(strTimeObj.hours)}</TimeLable>
			</TimeContainer>
			<TimeContainer>
				<TimeValue>
					{strTimeObj.minutes}
				</TimeValue>
				<TimeLable>Минуты</TimeLable>
			</TimeContainer>
			<TimeContainer>
				<TimeValue>
					{strTimeObj.seconds}
				</TimeValue>
				<TimeLable>Секунды</TimeLable>
			</TimeContainer>
           </TimeStyle>
        )
      }
}


export default Time;