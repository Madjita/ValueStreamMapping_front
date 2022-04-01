import { ExecException } from "child_process";
import React from "react";
import { useState,useEffect } from "react";
//import styled from 'styled-components'

import IDataBufferVSM from "../Data/IDataBufferVSM";


const Triangle = (props: {
    buff: IDataBufferVSM
}) =>
{
    let max = props.buff.max || 100;
    let height = 100;
    let width = 100;
    let min = props.buff.minHold || 1;
    
    const [value,setValue] = useState(props.buff.value)

    const findPoint =(percent : number,x: number,y: number) : number=>
    {
        let H_pointPx = (y*percent)/100 // Нашли сколько же пикселей занимает по высоте наши проценты
        let pointPx = H_pointPx // находим точку по высоте если считать снизу

        return findPointSin(pointPx,x/2,y) // находим длину по X
    }

    const findPointSin = (b : number,a1: number,b1: number  ) : number =>
    {
        return (b*a1)/b1
    }

    const  ValueToPercent = (value: number) : number =>
    {
      let percent = (value*100)/max
      return percent
    }


    const returnStr=()=>
    {
        let newHeight = height

        let x = width;
        let y = newHeight-20; //let y = this.state.height
        let percent = ValueToPercent(value as number)
        let point_Y = y - (y*percent)/100;
        let point_X = findPoint(percent,x,y)
        let percentByze = 10;

        let percentByze_new = percentByze*percent/100
        
        percentByze -=percentByze_new;	

        let byze = point_Y+((y*percentByze)/100) // плюс 10%
        

        let point_Y_2 = point_Y
        let point_X_2 = x - point_X

        return ("M0,"+y+" "+point_X+","+point_Y+" Q "+x/2+","+byze+" "+point_X_2+","+point_Y_2+" "+point_X_2+","+point_Y_2+" "+x+","+y+" Q 50,100 0,"+y+" 0,"+y)
    }

    const handleOnMouseMove = ()=>{
        //console.log("Trignale =",this.state.percent)
        //this.setState({left: this.state.left+1})
    }

      useEffect(() => {

        setValue(props.buff.value as number);
        /*const id = setInterval(() => {

            if(value > max)
            {
                setValue(0);
            }
            else
            {
                setValue(value+1);
            }
            
        }, 100);
        return () => clearInterval(id);*/
      }, [props.buff.value]);

      

		let viewBox = "0 0 "+width+" "+height;
		let pointsPolygon = "M0,"+height+" "+width/2+",0 "+width+" "+height;
		let D = returnStr()

		let minPrecent = ValueToPercent(min)

		let color = "green"
		
		if(value === 0)
		{
			color = "lightgray";
		}
		else
		{
			if(value as number < min)
			{
				color = "red"
			}
		}

		let changeText = value as number > (max/2-max/15)



		let PxMin_X = findPoint(minPrecent,width,height) 
		//let D_min = "M0,"+PxMin
		let newHeight = height-20
		pointsPolygon = "M0,"+newHeight+" "+width/2+",0 "+width+" "+newHeight+" Q 50,100 0,"+newHeight+" 0,"+newHeight;
	
        return (
			<div onMouseMove={handleOnMouseMove} style={{position: 'relative',display: 'flex',justifyContent:'center'}}>
				<p style={{position: 'absolute',
					color: changeText ? 'white' : "black",
					fontWeight: 600,
					top: '50%'}}>
					{value}
				</p>
				<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox} fill="none" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
				  <path d={pointsPolygon} fill="lightgray" stroke="lightgray" strokeWidth="1"></path>
				  <g><path d={D} fill={color} stroke={color}></path></g>
				</svg>
			</div>
        )
}

export default Triangle;