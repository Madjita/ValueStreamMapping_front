import React from "react";
//import styled from 'styled-components'


class Triangle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
		  width: this.props.width,
		  height: this.props.height,
		  percent: this.props.percent,

		  min: this.props.min,
		  max: this.props.max,
		  value: this.props.value,

		  left: this.props.left,
		  top: this.props.top,
        };
      }

	   findPoint =(percent,x,y)=>
		{
			let H_pointPx = (y*percent)/100 // Нашли сколько же пикселей занимает по высоте наши проценты
			let pointPx = H_pointPx // находим точку по высоте если считать снизу

			return this.findPointSin(pointPx,x/2,y) // находим длину по X
		}

		findPointSin = (b,a1,b1) =>
		{
			return (b*a1)/b1
		}

		returnStr=()=>
		{
			let newHeight = this.state.height

			let x = this.state.width;
			let y = newHeight-20; //let y = this.state.height
			let percent = this.ValueToPercent(this.state.value)
			let point_Y = y - (y*percent)/100;
			let point_X = this.findPoint(percent,x,y)
			let percentByze = 10;

			let percentByze_new = percentByze*percent/100
			
			percentByze -=percentByze_new;	

			let byze = point_Y+((y*percentByze)/100) // плюс 10%
			

			let point_Y_2 = point_Y
			let point_X_2 = x - point_X

			return ("M0,"+y+" "+point_X+","+point_Y+" Q "+x/2+","+byze+" "+point_X_2+","+point_Y_2+" "+point_X_2+","+point_Y_2+" "+x+","+y+" Q 50,100 0,"+y+" 0,"+y)
		}

		componentDidMount() {
			this.interval = setInterval(() => {
				let newValue = this.state.value+1;

				if(newValue > this.state.max)
				{
					newValue = 0;
				}
				this.setState({value: newValue}) //Math.floor(Math.random() * this.state.height)
			},100)
		}

		componentWillUnmount() {
			clearInterval(this.interval);
		  }


		  handleOnMouseMove = (e)=>{
			  //console.log("Trignale =",this.state.percent)
			  //this.setState({left: this.state.left+1})
		  }

		  ValueToPercent = (value) =>
		  {
			let percent = (value*100)/this.state.max
			return percent
		  }

		  

      render() {
		let {width,height,value,min,max} = this.state
		let viewBox = "0 0 "+width+" "+height;
		let pointsPolygon = "M0,"+height+" "+width/2+",0 "+width+" "+height;
		let D = this.returnStr()

		let minPrecent = this.ValueToPercent(this.state.min)

		let color = "green"
		
		if(value === 0)
		{
			color = "lightgray";
		}
		else
		{
			if(value < min)
			{
				color = "red"
			}
		}

		let changeText = value > (max/2-max/15)



		let PxMin_X = this.findPoint(minPrecent,width,height) 
		//let D_min = "M0,"+PxMin
		let newHeight = height-20
		pointsPolygon = "M0,"+newHeight+" "+width/2+",0 "+width+" "+newHeight+" Q 50,100 0,"+newHeight+" 0,"+newHeight;
	
        return (
			<div onMouseMove={this.handleOnMouseMove} style={{left: this.state.left, top: this.state.top,position: 'relative'}}>
				<p>Минимум: {this.state.max}</p>
				<p style={{position: 'absolute',
					color: changeText ? 'white' : "black",
					fontWeight: 600,
					left: 'calc(100%/2.2)',
					top: 'calc(100%/2.3)'}}>
					{this.state.value}
				</p>

				<p style={{position: 'absolute',
					color: "black",
					left: 'calc(100%/4.0)',
					top: 'calc(100%/1.15)'}}>
					Максимум: {this.state.min}
				</p>

				<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="none" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
				  <path d={pointsPolygon} fill="lightgray" stroke="lightgray" strokeWidth="1"></path>
				  <g><path d={D} fill={color} stroke={color}></path></g>
				</svg>
			</div>
        )
      }
}


export default Triangle;