import React from "react";

import MidleContentStyle from "./MidleContentStyle"

import DiagramViewBox from "../../../Diagrams/DiagramViewBox"

//import  {ListActiveConxtext} from "../../../../ListActiveContextProvider"

import Triangle from "../../../SVG/Triangle/Triangle"

import Buffer from "../../../Buffer/Buffer"

import Etap from "../../../Etap/Etap"

var  savePositionOnMouseDown = {
  x: 0,
  y: 0
};

var difference = {
  x: 0,
  y: 0
}

var mouseZoomPosition = {
  x:0,
  y:0
}

var pressTimer = undefined;
var longpress = { 
  countCLick: 0,
  time: 0
};

class MidleContent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          scale: 1,
          x: 0,
          y: 0,
          originX: 0,
          originY: 0,
          DragPostion: {x: 0,y: 0},


          divX: 0,
          divY: 0,



          mouseX: 0,
          mouseY: 0,

          drag: false
        };
      }

      static MidleContentStyle;

      static DIV;

      

      //static contextType = ListActiveConxtext;

      _showCard = () =>
      {
          if(this.context.ListActive.length === 0)
          {
            return <h3>MidleContent</h3>
          }

          let object = this.context.ListActive.find(item => item.isSelected === true)

          console.log("this._showCard(context)",this.context)

     

          return <h3>{object.name}</h3>
      }

      getCoords = (elem) => {
        let box = elem.getBoundingClientRect();
        console.log(this.MidleContentStyle.pageYOffset)
        return {
          top: Math.round(box.top), //pageYOffset
          left: Math.round(box.left)//pageXOffset
        };
      }

      handleOnWhell = (e) =>
      {
        //let count = (e.deltaY/17)
        let target = this.MidleContentStyle//e.target.closest('....'); // Здесь что-то уникальное, что может указать на род. блок
        let targetCoords = target.getBoundingClientRect();

        let originX;
        let originY

        let scale = this.state.scale


        const wheel = e.deltaY < 0 ? 1 : -1;

        //e.preventDefault()

        // Compute zoom factor.
        let zoom// = Math.exp(wheel * this.state.scale);
        console.log("wheel = ",wheel)
        if(wheel > 0)
        {
          zoom = scale-0.05
          if(zoom < 0.7 )
          {
            zoom = 0.7;

            //originX = 0;
            //originY = 0;
          }
          else
          {
            originX = (e.clientX - targetCoords.left )/ scale;
            originY = (e.clientY - targetCoords.top )/ scale;
          }

          
        }
        else
        {
          
          zoom = scale+0.05

          if(zoom > 2 )
          {
            zoom = 2
          }
          originX = (e.clientX - targetCoords.left )/ scale;
          originY = (e.clientY - targetCoords.top )/ scale;

        }


      

        this.setState({scale: zoom,originX: mouseZoomPosition.x ,originY: mouseZoomPosition.y  }) //,x: e.screenX, y: e.screenY

       /* switch (e.deltaY > 0) {
            case true:
              console.log('positive',e.deltaY,count);
              let plus = this.state.scale+0.05

              this.setState({scale: zoom,originX: -originX, originY: -originY }) //,x: xCoord, y: yCoord
              break;
            default:
              console.log('negative',e.deltaY,count);
              count *=(-1)

              let minus = this.state.scale-0.05
              if(minus < 0 )
              {
                minus = 0
              }
              
          }*/
      }

      handleOnMouseMove = (e) =>
      {
        let target = this.MidleContentStyle;
        let position = this.getTransformedPoint(target,e.clientX,e.clientY,this.state.scale)
        //let difference = 0;
          switch(e.button)
          {
            case 1:
              
              difference = {
                x : (savePositionOnMouseDown.x - position.x  ),
                y : (savePositionOnMouseDown.y - position.y  )
              }
              //console.log("handleOnMouseMove = ",difference,e,e.buttons)
              console.log("origin = ",savePositionOnMouseDown, " newPosition = ",position, " dif = ",difference,"Scale = ", this.state.scale)
              this.setState({DragPostion: {
                x: this.state.DragPostion.x-difference.x,
                y: this.state.DragPostion.y-difference.y},
              },
             );
              break;
            default:
              this.setState({
                //originX: position.x ,
               // originY: position.y 
              });
              break;
          }

          mouseZoomPosition = {
            x: position.x,
            y: position.y
          }

     
        //console.log(target.getBoundingClientRect(),"pos =",position )
        //this.setState({ mouseX: position.x, mouseY: position.y,originX: difference.x,originY: difference.y });
      }

      isMetaKey = (e) => {
        return navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey
      }

      getTransformedPoint=(target,x, y,scale)=> {
        let targetCoords = target.getBoundingClientRect();
        const transformedX = (x  - targetCoords.left)/ scale; //target.firstChild.scrollLeft
        const transformedY = (y  - targetCoords.top)/ scale; //target.firstChild.scrollTop
        return { x: transformedX, y: transformedY };
      }


      handleOnClick = (e) =>{

     
        return;
        let originX;
        let originY;

        let newX;
        let newY;

        let target = this.MidleContentStyle;

        let position = this.getTransformedPoint(target,e.clientX,e.clientY,this.state.scale)
       
        let targetCoords = this.DIV.getBoundingClientRect();

        console.log(target.getBoundingClientRect(),targetCoords)
        let position2 = {
          x: (e.clientX - targetCoords.left )/ this.state.scale,
          y: (e.clientY - targetCoords.top )/ this.state.scale
        }


        console.log(position,position2,{x:e.clientX,y:e.clientY})
        

        newX = position.x;
        newY = position.y;

        originX = position2.x//*this.state.scale;
        originY = position2.y//*this.state.scale;



        this.setState({ x: newX, y: newY, originX: originX,originY: originY, divX: originX, divY: originY }); //
      }


      handleMouseDown = (e) =>{

        switch(e.button)
        {
          case 1:
            let target = this.MidleContentStyle;
            savePositionOnMouseDown = this.getTransformedPoint(target,e.clientX,e.clientY,this.state.scale)
            console.log("handleMouseDown = ",savePositionOnMouseDown,e)

            longpress.time = 0;
            pressTimer = window.setInterval(function(){
              // your code here
              longpress.time++;
              },100)

            this.setState({drag: !this.state.drag})
            break;
          default:
            break;
        }
        
       
      }

      handleMouseUp = (e) =>{
        console.log("handleMouseUp")
        
        clearTimeout(pressTimer); //clear time on mouseup
        switch(e.button)
        {
          case 1:{
            switch(longpress.countCLick)
            {
                case 0:
                  if(longpress.time < 2)
                    longpress.countCLick++;
                  break;
                case 1:
                  if(longpress.time < 2)
                  {
                    longpress.countCLick = 0;
                    longpress.time = 0;
                    console.log("DOUBLE CLICK")
                    this.setState({scale: 1,originX: 0, originY: 0,
                      DragPostion: {
                        x: 0,
                        y: 0},
                    })
                  }
                  break;
                default:
                    break
            }
            longpress.time = 0;
            
            break;
          }
        }

        this.setState({drag: !this.state.drag})

      }

      handleDoubleClick = (e)=>{
        //console.log(" handleDoubleClick click = ",e.button)
      }

      //translate("+this.state.x+"px,"+this.state.y+"px)
      //transformOrigin:this.state.xScale+"px "+this.state.yScale+"px"
      //transformOrigin:this.state.originX+"px "+this.state.originY+"px",
      //  "scale("+this.state.scale+")"
      //overflow: "auto"
      render() {
        const {drag} = this.state
        return (
            <MidleContentStyle >
                <div style={{width: "100%", height: "100%",position: "relative",overflow: "hidden"}}   >
                  {/*<div  onClick={this.handleOnClick}  onMouseMove={this.handleOnMouseMove} onWheel={this.handleOnWhell}  ref={(MidleContentStyle) => { this.MidleContentStyle = MidleContentStyle;}} style={{width: "100%", height: "100%",position: "absolute",transformOrigin: this.state.originX+"px "+this.state.originY+"px",transform:"scale("+this.state.scale+")",boxShadow: "rgba(0,0,0,0.2) 0px 3px 5px -1px,rgba(0,0,0,0.14) 0px 6px 10px 0px,rgba(0,0,0,0.12) 0px 1px 14px 0px"}}>*/}
                  <div  ref={(DIV) => { this.DIV = DIV;}} onDoubleClick={this.handleDoubleClick}   onClick={this.handleOnClick} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} onMouseMove={this.handleOnMouseMove} onWheel={this.handleOnWhell}    style={{width: "100%", height: "100%",position: "absolute"}}>
                    <div  ref={(MidleContentStyle) => { this.MidleContentStyle = MidleContentStyle; }}  style={{position: "absolute",
                        width: (1411)+"px",
                        height: (1100)+"px",
                        top: "0px",
                        left: "0px",
                        transformOrigin: this.state.originX+"px "+this.state.originY+"px",
                        //transformOrigin:"0px 0px",
                        cursor: drag ? 'grab': '',
                        transform: "translate("+this.state.DragPostion.x+"px, "+this.state.DragPostion.y+"px) scale("+this.state.scale+")",
                        pointerEvents: "all"}}>
                      <div style={{
                          width: "500px",
                          top: (1411/2)+"px",
                          left: (1100/2)+"px",
                          pointerEvents: "all",
                          position: "absolute",
                          boxShadow: "rgba(0,0,0,0.2) 0px 3px 5px -1px,rgba(0,0,0,0.14) 0px 6px 10px 0px,rgba(0,0,0,0.12) 0px 1px 14px 0px",
                          //transform: "translate("+this.state.originX+"px, "+this.state.originY+"px) scale("+this.state.scale+")"
                        
                          }}
                          > 

                      <Triangle   left={200} top={200} width={100} height={100} min={50} max={100} value={0}/>
                      <Triangle   left={200} top={0}  width={100} height={100} min={50} max={100} value={50}/>
                      {/*
                      <img id="crosshair" src="https://interactive-examples.mdn.mozilla.net/media/examples/crosshair.svg" style={{ backgroundColor:"green",position: "absolute",left: "calc("+(this.state.originX-12)+"px)", top: "calc("+(this.state.originY-12)+"px)",opacity: "1"}} width="24px"></img>*/}
                      <img id="crosshair" src="https://interactive-examples.mdn.mozilla.net/media/examples/crosshair.svg" style={{backgroundColor: "red", position: "absolute",left: "calc("+(this.state.originX-12)+"px)", top: "calc("+(this.state.originY-12)+"px)",opacity: "1"}} width="24px"></img>
                      </div>

                      <Buffer x={100} y={50} triangle={{min: 20, max: 100, value: 0}}/>

                      <Etap x={300} y={50}/>

                      <Buffer x={570} y={50} triangle={{min: 60, max: 100, value: 0}}/>

                    


                      
                      {/*<img id="crosshair" src="https://interactive-examples.mdn.mozilla.net/media/examples/crosshair.svg" style={{position: "absolute",left: "calc("+(this.state.originX-12)+"px)", top: "calc("+(this.state.originY-12)+"px)",opacity: "1"}} width="24px"></img>
                     <img id="crosshair" src="https://interactive-examples.mdn.mozilla.net/media/examples/crosshair.svg" style={{position: "absolute",left: "calc("+(this.state.mouseX-12)+"px)", top:"calc("+(this.state.mouseY-12)+"px)",opacity: "1"}} width="24px"></img>*/}
                    </div>
                  </div>
    
         
                 
                </div>


               {/* <DiagramViewBox/>

              <ListActiveConxtext.Consumer>
                {value => (
                  <h3>MidleContent {console.log(value.ListActive)}</h3>
                )}
                
                </ListActiveConxtext.Consumer>*/} 
            </MidleContentStyle>

        )
      }
}



export default MidleContent;

//<h3>{context.activeObject.name ? context.activeObject.name : "MidleContent"}</h3>

/*

Есть "Заказ".... 
У заказа есть время его выполнения. Актуальное (текущее) оно динамически изменяется и По дефелту то которое было измеренно как константа.
Напирмер: "Велосипеды 5 штук" или "Самокат 10 штук"....  
У каждого заказа есть "Карта". 

Буферы и Этапы для 1 карты могут быть не уникальные. К примеру Этап Сварки может быть у карты Велосипедов 5 штук и у самокатов 10 штук.

Карта состоит из "Буферов" и "Этапов". Они связанны друг с другом (в целом карта показывает полностью производство велосипеда или самоката) 
Перед каждым Этапом есть Буфер.
Буфер имеет какое то число деталей "максимальное", "текущее" и "минимум" который нужно удерживать, число "частоты пополнения"...  "Время ожидания"
Буфер состоит из Заказов находящикся в ожидании (в очереде), Самый 1 в очереде идет на выполнение в Этап. 

Этап состоит из :
1) Времени цикла актуального и дефолтного измеренного как константа ( это число показывающее за сколько деталь будет произведенна на этом этапе)
2) Время подготовки так же актуальное и дефолтное - это время константное которое нужно на переподготовку для другого заказа ( допустим Делали велики теперь самокаты , надо перенастроить оборудование вот это время показывает его перенастройку)
3) Доступность - Это процент доступности оборудования или человека... (к примеру )
4) Количество Людей или оборудования работающего на этом этапе. (какое то число оборудования или людей которые работают и производят деталь)
5) Количество смен ( пока не знаю что это такое но пусть будет)

*/