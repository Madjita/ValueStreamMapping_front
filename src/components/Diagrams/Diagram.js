import React from "react";
import { 
  DiagramComponent,
  HierarchicalTree,
  MindMap,
  RadialTree,
  ComplexHierarchicalTree,
  DataBinding,
  Snapping,
  PrintAndExport,
  BpmnDiagrams,
  SymmetricLayout,
  ConnectorBridging,
  UndoRedo,
  LayoutAnimation,
  DiagramContextMenu,
  ConnectorEditing,
  Inject,
  SnapConstraints,
  DiagramTools,
} from "@syncfusion/ej2-react-diagrams";

//import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationDataLabel, PieSeries, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';

import MyTrinagle from "../SVG/Triangle/Triangle"

let diagramInstance = DiagramComponent;



var template = diagramTemplate;


function findGIP(a,b)
{
  return Math.sqrt(a*a+b*b)
}

function findPixelProsent(need,heigh)
{
  return (need*heigh)/100
}

function sin(b,a)
{
  return b/a //  прилижайщий катит к другому катиту
}


function findPoint(percent,x,y)
{
   let H_pointPx = (y*percent)/100 // Нашли сколько же пикселей занимает по высоте наши проценты
   let pointPx = H_pointPx // находим точку по высоте если считать снизу

   return findPointSin(pointPx,x/2,y) // находим длину по X
}

function findPointSin(b,a1,b1)
{
   console.log("b= ",b,"a1= ",a1,"b1 = ",b1)
   return (b*a1)/b1
}


function findA(c1,b)
{
  return Math.sqrt(c1*c1-b*b)
}




var Triangle;


function myTriangle()
{
  return <MyTrinagle width={100} height={100} value={20} max={100} min={50}/>
}

function diagramTemplate(props){
  

  //let points = "0,100 "+find+","+point+" "+find+",0 100,100"
  if (props.id === "pie") {
      return (
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-database">
          {/*<path d="M 0 0 0 100 100 100 100 0 0 0 L"></path>*/}
          <polygon points="0,100 50,0 100,100" fill="violet" stroke="purple" strokeWidth="1"></polygon>
          <g><path d="M0,100 50,0 100,100" fill="gray" ></path></g>
          <g><path d="M0,100 40,20 60,20 100,100" fill="red" ></path></g>
          <g><path d="M0,100 30,40 70,40 100,100" fill="yellow" ></path></g>
          <g><path d="M0,100 20,60 80,60 100,100" fill="blue"></path></g>
          <g><path d="M0,100 10,80 90,80 100,100" fill="green" ></path></g>
          
          
         
          {/*<polyline points="0,100 10,80 90,80 100,100" fill="green" stroke="purple" stroke-width="1"></polyline>
          <polyline points="10,80 20,60 80,60 90,80" fill="blue" stroke="purple" stroke-width="2"></polyline>
    <polyline points="20,60 30,40 70,40 80,60" fill="yellow" stroke="purple" stroke-width="2"></polyline>*/}

          
        </svg>
      </div>
      );
  }

  if (props.id === "pieCircl") {
    Triangle = myTriangle()
    return Triangle
  }

  if(props.id === "datastore")
  {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-database">
          {/*<path d="M 0 0 0 100 100 100 100 0 0 0 L"></path>*/}
          <polygon points="0,100 50,0 100,100" fill="violet" stroke="purple" strokeWidth="1"></polygon>
          <g><path d="M0,100 50,0 100,100" fill="gray" ></path></g>
          <g><path d="M0,100 40,20 C 90,80  60,20 100,100" fill="red" ></path></g>
          <g><path d="M0,100 30,40 C 90,100  70,40 100,100" fill="yellow" ></path></g>
          <g><path d="M0,100 20,60 C 100,100  80,60 100,100" fill="blue"></path></g>
          <g><path d="M0,100 10,80 C 90,100  90,80 100,100" fill="green" ></path></g>
          
         
          {/*<polyline points="0,100 10,80 90,80 100,100" fill="green" stroke="purple" stroke-width="1"></polyline>
          <polyline points="10,80 20,60 80,60 90,80" fill="blue" stroke="purple" stroke-width="2"></polyline>
    <polyline points="20,60 30,40 70,40 80,60" fill="yellow" stroke="purple" stroke-width="2"></polyline>*/}

          
        </svg>
      </div>
      )
  }
}

class Diagram extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          myStyle: this.props.myStyle,
          diagram: this.props.diagram,
          connectors: this.props.connectors,
          update: true,
        };

       
      }
      diagramInstance =  diagramInstance;
      // A node is created and stored in nodes array.


      async api(ip,port,command) {
        // GET request using fetch with async/await
        const response = await fetch("http://"+ip+":"+port+command);
        const data = await response.json();
        return data
      }


      async create_customer(element)
      {
        //let http = "http://"+window.ip+":"+window.port
        console.log("element",element.oldProperties.id);

        switch(element.oldProperties.id)
        {
          case "Customer":{
            //api/reason_customer/insert/:Node_name_id/:offsetX/:offsetY"
        
            //const response = await fetch(http+"/api/reason_customer/insert/"+element.properties.id+"/"+element.properties.offsetX+"/"+element.properties.offsetY)
            //const data = await response;
            //return data
            break;
          }
          case "Process":{
            break;
          }
          case "External_Shipment":{
            break;
          }
          case "Inventory_customer_supplier":
          {
              break;
          }
          case "Production_control":
          {
              break;
          }
          default:
            break;
        }

        
        
      }

     update_position(element)
      {
        var myData = []
        element.forEach(item =>{
          myData.push({
            id: item.properties.id,
            offsetX: item.properties.offsetX,
            offsetY: item.properties.offsetY
          })
        })

        //console.log(JSON.stringify(myData))
        //api/reason_customer/insert/:Node_name_id/:offsetX/:offsetY"
        //let http = "http://"+window.ip+":"+window.port
        //fetch(http+"/api/vsm/update_position/")
        //.then(response => response.json());
      }

     
      /*componentDidMount() {
        this.interval = setInterval(() => {
          let rand = Math.floor(Math.random() * 60);
          //diagramInstance.nodes[1].annotations[0].content = rand.toString()
          this.setState({update: !this.state.update})
        }, 1000);
      }
      
      componentWillUnmount() {
        console.log("DiagramViewBox componentWillUnmount")
        clearInterval(this.interval);
      }*/

      

      render() {

        const {myStyle,diagram} = this.state
        console.log("DFSFA")
     

        return (
        <DiagramComponent  id="diagram" ref={diagram => (diagramInstance = diagram)}
        width = {'100%'}
        height = {'100%'}
        snapSettings={{ constraints: SnapConstraints.None }}
        // Add node
        nodes = {
          diagram
        }
        connectors = {
          this.state.connectors
        }

        drop={(e)=>{
          //console.log("drop",e)
          //console.log("drop length",e.element.annotations.length)
          this.create_customer(e.element)
          //e.element.annotations[0].content = "#1"
        
          //e.newValue[0].annotations[0].content = "#1"
        }}

        positionChange={(e)=>{

          switch(e.state)
          {
            case "Completed":{
              console.log("position",e.source.nodes)
              if(e.source.nodes !== undefined)
                this.update_position(e.source.nodes)
            
            break;  }
            case "Progress":{break;}
            case "Start":{break;}
            default:  break;
          }
          

          
        }}

        dragTargetEnd={(e)=>{
          console.log("dragTargetEnd",e)
        }}

        
        tool = {
          DiagramTools.ZoomPan
      }

        
       /* selectionChange={(e)=>{
        
          console.log("SELECT",e.newValue)
        }}*/
        created = {
          () => {
            console.log("render Diagram = ",this.children)
            //console.log(diagramInstance.getActiveLayer())
            //this.diagramInstance.getActiveLayer();


           // diagramInstance.tool = DiagramTools.ZoomPan;
            //diagramInstance.dataBind();
            diagramInstance.scrollChange = args => {
            //Obtains the pan status
            //let panStatus = args.panState;
           }

 
            //diagramInstance.tool = DiagramTools.ZoomPan;
            //diagramInstance.dataBind();
            /*diagramInstance.scrollChange = { args: IScrollChangeEventArgs => {
            //Obtains the pan status
            console.log(IScrollChangeEventArgs)
            let panStatus = IScrollChangeEventArgs.panState;}}
            }*/
          }
        }

            //Disables mouse over tooltip at runtime
            tooltip = {
              null
          }


          style = {myStyle}
          nodeTemplate={diagramTemplate.bind(this)}
        

       >
         <Inject  width = {'200px'}
        height = {'200px'}
  services={[
    HierarchicalTree,
    MindMap,
    RadialTree,
    ComplexHierarchicalTree,
    DataBinding,
    Snapping,
    PrintAndExport,
    BpmnDiagrams,
    SymmetricLayout,
    ConnectorBridging,
    UndoRedo,
    LayoutAnimation,
    DiagramContextMenu,
    ConnectorEditing
  ]}
/>
       </DiagramComponent>);
      }
}


export default Diagram;




