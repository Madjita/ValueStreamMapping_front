import React from "react";

import Diagram from './Diagram'
import SymbolPalette from './SymbolPalette'

import {PortVisibility
} from "@syncfusion/ej2-react-diagrams";



let style =  { strokeColor: "red", strokeDashArray: "3,3", strokeWidth: 2 }

let customer = {
  id:'Customer',
  // Position of the node
  offsetX: 500,
  offsetY: 250,
  // Size of the node
  width: 100,
  height: 70,
  shape: { 
    type: 'Native',
    content: "<g id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 84.96 67.16\">"+
    "<defs><style>.cls-1{fill:#fcd1a5;}</style></defs>"+
    "<title>customer-supplier</title>"+
    "'<path class=\"cls-1\" d=\"M6.51,23.71A2.31,2.31,0,0,1,7.46,22L29.33,7c0.54-.36.94-0.13,0.94,0.49v14c0,0.63.4,0.86,0.94,0.49L53.09,7C53.63,6.65,54,6.88,54,7.51v14c0,0.63.4,0.86,0.95,0.49L77.57,7c0.54-.36.94-0.13,0.94,0.49V59.26a1.11,1.11,0,0,1-1.12,1.13H7.64a1.11,1.11,0,0,1-1.12-1.12V23.71Z\"/></g>",
    shape: 'Customer',
    //scale: 'Meet'
  },
  //constraints: NodeConstraints.Default | NodeConstraints.Shadow,
  style: {
    fill: 'none',
    ...style,
    strokeWidth: 0,
  },
};


let process = {
    id: 'Process',
    // Position of the node
    offsetX: 250,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 100,
    annotations: [
      { content: 'New \n Process' },
      { content: '0', offset:{
          x: 0.5,
          y:0.88
      },
    }],
    shape: { 
      type: 'Native',
      content: "<g id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 88.01 69.16\">"+
      "<defs><style>.cls-1{fill:#fcd1a5;}.cls-2,.cls-3{fill:none;stroke-miterlimit:10;stroke-width:0.9px;}.cls-2{stroke:#fff;}.cls-3{stroke:#3d4752;}</style></defs>"+
      "<title>dedicated-process</title>"+
      "<rect class=\"cls-1\" x=\"6.48\" y=\"7.4\" width=\"72\" height=\"54\" rx=\"1.13\" ry=\"1.13\"/>"+
      "<line class=\"cls-2\" x1=\"6.48\" y1=\"25.4\" x2=\"78.48\" y2=\"25.4\"/>"+
      "<path class=\"cls-1\" d=\"M17.73,54.74A3.87,3.87,0,0,1,14,59a4.14,4.14,0,0,1-4-4V54.83\"/>"+
      "<path class=\"cls-3\" d=\"M17.73,54.74A3.87,3.87,0,0,1,14,59a4.14,4.14,0,0,1-4-4V54.83\"/>"+
      "<path class=\"cls-1\" d=\"M11.43,55.37A2.33,2.33,0,0,1,13.77,53a2.5,2.5,0,0,1,2.65,2.2,2.27,2.27,0,0,1-2.29,2.39A2.55,2.55,0,0,1,11.43,55.37Z\"/>"+
      "<path class=\"cls-3\" d=\"M11.43,55.37A2.33,2.33,0,0,1,13.77,53a2.5,2.5,0,0,1,2.65,2.2,2.27,2.27,0,0,1-2.29,2.39A2.55,2.55,0,0,1,11.43,55.37Z\"/></g>",
      shape: 'Process',
      //scale: 'Meet'
    },
    //constraints: NodeConstraints.Default | NodeConstraints.Shadow,
    style: {
      fill: 'none',
      ...style,
      strokeWidth: 0,
    },
  };

let external_shipment = {
    id: 'External_Shipment',
    // Position of the node
    offsetX: 250,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 50,
       // Sets the annotation for the node
    /*annotations: [{
      // Sets the horizontal alignment as left
      // Sets the vertical alignment as Center
      offset: {
        x: 0.3,
        y: 0.4
      }
    }],*/
   // Sets the annotation for the connector
    annotations: [{
      content: 'New External shipment',
      // Sets the margin for the content
      margin: {
          top: 5
      },
      horizontalAlignment: 'Center',
      verticalAlignment: 'Top',
      offset: {
          x: 0.5,
          y: 1
      }
    }],
    shape: { 
      type: 'Native',
      content: "<g id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 86.15 46.95\"><defs>"+
      "<style>.external_shipment-1{fill:#abddf3;}.external_shipment-2{fill:none;stroke:#fff;stroke-miterlimit:10;stroke-width:0.9px;}.external_shipment-3{fill:#3d4752;}</style></defs>"+
      "<title>external-shipment</title>"+
      "<rect class=\"external_shipment-1\" x=\"1.76\" y=\"1.95\" width=\"47.21\" height=\"37.49\" rx=\"1.13\" ry=\"1.13\"/>"+
      "<rect class=\"external_shipment-2\" x=\"1.76\" y=\"1.95\" width=\"47.21\" height=\"37.49\" rx=\"1.13\" ry=\"1.13\"/>"+
      "<path class=\"external_shipment-1\" d=\"M49,39.44,55.81,13.2h9a1.91,1.91,0,0,1,1.58,1l4.09,9.18a0.68,0.68,0,0,1-.67,1H56.93a1.11,1.11,0,0,1-1.12-1.12V13.2M49,39.44H81.64a1.11,1.11,0,0,0,1.13-1.12V25.58a1.11,1.11,0,0,0-1.12-1.12H77.18a1.92,1.92,0,0,1-1.62-1L69.71,10.5a1.92,1.92,0,0,0-1.62-1h-18A1.14,1.14,0,0,0,49,10.59V39.44\"/>"+
      "<path class=\"external_shipment-2\" d=\"M49,39.44,55.81,13.2h9a1.91,1.91,0,0,1,1.58,1l4.09,9.18a0.68,0.68,0,0,1-.67,1H56.93a1.11,1.11,0,0,1-1.12-1.12V13.2M49,39.44H81.64a1.11,1.11,0,0,0,1.13-1.12V25.58a1.11,1.11,0,0,0-1.12-1.12H77.18a1.92,1.92,0,0,1-1.62-1L69.71,10.5a1.92,1.92,0,0,0-1.62-1h-18A1.14,1.14,0,0,0,49,10.59V39.44\"/>"+
      "<path class=\"external_shipment-3\" d=\"M24,39.44C24,43.58,21,47,17.33,47s-6.84-3.37-6.84-7.51S13.6,32,17.33,32,24,35.3,24,39.44Z/>"+
      "<path class=\"external_shipment-2\" d=\"M24,39.44C24,43.58,21,47,17.33,47s-6.84-3.37-6.84-7.51S13.6,32,17.33,32,24,35.3,24,39.44Z/>"+
      "<path class=\"external_shipment-3\" d=\"M69.22,39.44c0,4.14-3,7.51-6.71,7.51s-6.71-3.37-6.71-7.51,3-7.47,6.71-7.47S69.22,35.3,69.22,39.44Z\"/>"+
      "<path class=\"external_shipment-3\" d=\"M69.22,39.44c0,4.14-3,7.51-6.71,7.51s-6.71-3.37-6.71-7.51,3-7.47,6.71-7.47S69.22,35.3,69.22,39.44Z\"/></g>",
      shape: 'External\nShipment',
      //scale: 'Meet'
    },
    //constraints: NodeConstraints.Default | NodeConstraints.Shadow,
    style: {
      fill: 'none',
      ...style,
      strokeWidth: 0,
    },
  };

let inventory = {
    id: 'Inventory',
    // Position of the node
    offsetX: 250,
    offsetY: 250,
    // Size of the node
   // Sets the annotation for the node
    width: 50,
    height: 50,
    annotations: [{
      content: 'New External shipment',
      // Sets the margin for the content
      margin: {
          top: 5
      },
      horizontalAlignment: 'Center',
      verticalAlignment: 'Top',
      offset: {
          x: 0.5,
          y: 1
      }
    }],
    shape: { 
      type: 'Native',
      content: "<g id=\"Layer_1\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 65.87 62.85\"><defs>"+
      "<style>.Inventory-1{fill:#abddf3;}</style></defs>"+
      "<title>inventory-customer-supplier</title>"+
      "<path class=\"Inventory-1\" d=\"M36.23,6.39a0.56,0.56,0,0,0-1.08,0L7,58.41a0.61,0.61,0,0,0,.58,1H63.82a0.61,0.61,0,0,0,.58-1Z\"/></g>",
      shape: 'Inventory',
      //scale: 'Meet'
    },
    //constraints: NodeConstraints.Default | NodeConstraints.Shadow,
    style: {
      fill: 'none',
      ...style,
      strokeWidth: 0,
    },
  };

let production_control = {
    id: 'Production_control',
    // Position of the node
    offsetX: 250,
    offsetY: 250,
    // Size of the node
   // Sets the annotation for the node
    width: 300,
    height: 100,
    annotations: [{
      content: 'New Production Control',
      // Sets the margin for the content
      horizontalAlignment: 'Center',
      offset: {
          x: 0.5,
          y: 0.2
      }
    },
    {
      content: 'New Production Control',
      // Sets the margin for the content
      horizontalAlignment: 'Center',
      offset: {
          x: 0.5,
          y: 0.7
      }
    }],
    shape: { 
      type: 'Native',
      content: "<g id=\"production_control\" data-name=\"Layer 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 83.33 65.36\">"+
      "<defs><style>.production_control-1,.production_control-2{fill:#d2e5b3;}.production_control-2{stroke:#fff;stroke-miterlimit:10;stroke-width:0.9px;}</style></defs>"+
      "<title>production-control</title>"+
      "<rect class=\"production_control-1\" x=\"6.25\" y=\"5.7\" width=\"72\" height=\"54\" rx=\"1.13\" ry=\"1.13\"/>"+
      "<line class=\"production_control-2\" x1=\"6.25\" y1=\"27.3\" x2=\"78.25\" y2=\"27.3\"/></g>",
      shape: 'Production\ncontrol',
      //scale: 'Meet'
    },
    //constraints: NodeConstraints.Default | NodeConstraints.Shadow,
    style: {
      fill: 'none',
      ...style,
      strokeWidth: 0,
    },
  };


let connector = {
  // Name of the connector
  id: "connector",
  type: 'Bezier',
  style: {
      strokeColor: '#6BA5D7',
      fill: '#6BA5D7',
      strokeWidth: 2
  },
  targetDecorator: {
      style: {
          fill: '#6BA5D7',
          strokeColor: '#6BA5D7',
          strokeDashArray: '0'
      }
  },
  // ID of the source and target nodes
  sourceID: "",
  targetID: "",
  // Set Source Padding value
  sourcePadding:20,
  // Set Target Padding value
  targetPadding:20
  }

  let stright_connector = {
  id: "stright_connector",
  // Defines the segment type of the connector
  segments: [{
      type: 'Straight',
      // Defines the point of the segment
      point: {
          x: 100,
          y: 150
      }
  },
  {
    type: 'Straight',
    // Defines the point of the segment
    point: {
        x: 100,
        y: 150
    }
  }],
  annotations: [{
    // Sets the text to be displayed
    content: 'Annotation',
}],
  style: {
      strokeColor: '#6BA5D7',
      fill: '#6BA5D7',
      strokeWidth: 2
  },
  targetDecorator: {
      style: {
          fill: '#6BA5D7',
          strokeColor: '#6BA5D7'
      }
  },
  type: 'Straight',
  sourcePoint: {
      x: 100,
      y: 100
  },
  targetPoint: {
      x: 200,
      y: 200
  }
}


let port  = {
  style: {
      strokeColor: '#366F8C',
      fill: '#366F8C'
  }
  }
 


let connectors = []
let diagram = []


function clone(item)
{
  return JSON.parse(JSON.stringify(item))
}

let shape = { type: "HTML" };




class DiagramViewBox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          number: 1
        };

        diagram = []
        connectors = []

        diagram.push({
          id: 'pie', offsetX: 100, offsetY: 450, width: 100, height: 50, shape: shape,
        })

        diagram.push({
          id: 'pieCircl', offsetX: 600, offsetY: 450, width: 100, height: 50, shape: shape,
          /*annotations: [{
            content: 'New External shipment ',
            // Sets the margin for the content
            margin: {
                top: 5
            },
            horizontalAlignment: 'Center',
            verticalAlignment: 'Top',
            offset: {
                x: 0.5,
                y: 1.5
            }
          }],*/
        })

        diagram.push({
          id: 'datastore', offsetX: 300, offsetY: 450, width: 100, height: 50, shape: shape,
          
        })

        let yPosition = 100

        let obj_connector = clone(connector);


        let obj = clone(customer);

        obj = clone(inventory);
        obj.annotations[0].content = 'Стальные листы 3 дня'
        obj.id += "_3"
        obj.offsetX = 100
        obj.offsetY = yPosition
        obj.height = 0
        obj_connector.targetID = obj.id;

        diagram.push(obj)

        obj_connector = clone(connector);
        obj_connector.id += "_3"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 40
        obj_connector.style.strokeDashArray = '0'
        obj = clone(process);
        obj.annotations[0].content = 'Штамповка'
        obj.annotations[1].content = '15'
        obj.id += "_4"
        obj.offsetX = 280
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;

        connectors.push(obj_connector)
        diagram.push(obj)

        obj_connector = clone(connector);
        obj_connector.id += "_4"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 5
        obj_connector.targetPadding = 0
        obj_connector.style.strokeDashArray = '2,2'
        obj = clone(inventory);
        obj.annotations[0].content = 'Левых: 4600\nПравых: 2400'
        obj.id += "_5"
        obj.offsetX = 400
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;

        connectors.push(obj_connector)
        diagram.push(obj)

        obj_connector = clone(connector);
        obj_connector.id += "_5"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 5
        obj_connector.targetPadding = 0
        obj_connector.style.strokeDashArray = '2,2'
        obj = clone(process);
        obj.annotations[0].content = 'Сварка'
        obj.annotations[1].content = '10'
        obj.id += "_6"
        obj.offsetX = 520
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;
        
        connectors.push(obj_connector)
        diagram.push(obj)

        obj_connector = clone(connector);
        obj_connector.id += "_6"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 5
        obj_connector.targetPadding = 0
        obj_connector.style.strokeDashArray = '2,2'
        obj = clone(inventory);
        obj.annotations[0].content = 'Левых: 1500\nПравых: 600'
        obj.id += "_7"
        obj.offsetX = 650
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;

        connectors.push(obj_connector)
        diagram.push(obj)

        obj_connector = clone(connector);
        obj_connector.id += "_7"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 5
        obj_connector.targetPadding = 0
        obj_connector.style.strokeDashArray = '2,2'
        obj = clone(process);
        obj.annotations[0].content = 'Шлифовка'
        obj.annotations[1].content = '10'
        obj.id += "_8"
        obj.offsetX = 780
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;

        connectors.push(obj_connector)
        diagram.push(obj)

        obj_connector = clone(connector);
        obj_connector.id += "_8"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 5
        obj_connector.targetPadding = 0
        obj_connector.style.strokeDashArray = '2,2'
        obj = clone(inventory);
        obj.annotations[0].content = 'Левых: 5600\nПравых: 850'
        obj.id += "_9"
        obj.offsetX = 900
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;

        connectors.push(obj_connector)
        diagram.push(obj)


        obj_connector = clone(connector);
        obj_connector.id += "_10"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 5
        obj_connector.targetPadding = 0
        obj_connector.style.strokeDashArray = '2,2'
        obj = clone(process);
        obj.annotations[0].content = 'Покраска'
        obj.annotations[1].content = '20'
        obj.id += "_11"
        obj.offsetX = 1030
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;

        connectors.push(obj_connector)
        diagram.push(obj)


        obj_connector = clone(connector);
        obj_connector.id += "_11"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 5
        obj_connector.targetPadding = 0
        obj_connector.style.strokeDashArray = '2,2'
        obj = clone(inventory);
        obj.annotations[0].content = 'Левых: 1440\nПравых: 2700'
        obj.id += "_12"
        obj.offsetX = 1150
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;

        connectors.push(obj_connector)
        diagram.push(obj)

        obj_connector = clone(connector);
        obj_connector.id += "_12"
        obj_connector.sourceID = obj.id;
        obj_connector.sourcePadding = 5
        obj_connector.targetPadding = 0
        obj_connector.style.strokeDashArray = '2,2'
        obj = clone(process);
        obj.annotations[0].content = 'Отгрузка'
        obj.annotations[1].content = '5'
        obj.id += "_13"
        obj.offsetX = 1300
        obj.offsetY = yPosition
        obj_connector.targetID = obj.id;

        connectors.push(obj_connector)
        diagram.push(obj)
       
        console.log("CONSTRUCTOR")
       

      }

      render() {
        return (
            <div style={{
                //display:'flex',
                width:'100%',
                height:'100%'
                }}>
            <Diagram 
              diagram={diagram}
              connectors={connectors}
            />
            {/*<SymbolPalette       
                myStyle={{
                    flex: '1 1 200px'
                }}
                customer={customer}
                process={process}
                external_shipment={external_shipment}
                inventory={inventory}
                production_control={production_control}
              />*/}

            </div>
        )
      }
}

        

export default DiagramViewBox;