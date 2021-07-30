import React from "react";
import {
    SymbolPaletteComponent
} from "@syncfusion/ej2-react-diagrams";


class SymbolPalette extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            myStyle: props.myStyle,
            handlerGetBasicShapes: props.handlerGetBasicShapes,
            customer: props.customer,
            process: props.process,
            external_shipment: props.external_shipment,
            inventory:props.inventory,
            production_control: props.production_control,
        };
      }

      // A node is created and stored in nodes array.

      getSvgShapes()
      {
        let basicShapes = []
        basicShapes.push(this.state.customer)
        basicShapes.push(this.state.process)
        basicShapes.push(this.state.external_shipment)
        basicShapes.push(this.state.inventory)
        basicShapes.push(this.state.production_control)
        return basicShapes;
      }

      

      render() {

        const {myStyle,handlerGetBasicShapes} = this.state


        return (< SymbolPaletteComponent id = "pallete" 

         //Defines how many palettes can be at expanded mode at a time
         expandMode = {
            "Multiple"
        }
        //onClick={(e,item)=>{console.log("onClick",e,item)}}
        //DragEnter={()=>console.log}
    
        palettes = {
            [{
                    //Sets the id of the palette
                    id: 'flow',
                    //Sets whether the palette expands/collapse its children
                    expanded: true,
                    //Adds the palette items to palette
                    symbols: this.getSvgShapes(),
                    //Sets the header text of the palette
                    title: 'Flow Shapes',
                    iconCss: 'e-ddb-icons e-flow'
                }]
            }
        width = {
            '100%'
        }
        height = {
            '100%'
        }
        style = {
            myStyle
        }
        

         //Specifies the default size to render symbols
         symbolHeight = {
            80
        }
        symbolWidth = {
            80
        }

        //Sets the size, appearance and description of a symbol
        getSymbolInfo = {
            (symbol: Node | Connector): SymbolInfo => {
                if (symbol['text'] !== undefined) {
                    return {
                        //Add or Remove the Text for Symbol palette item.
                        description: {
                            //Defines the symbol description
                            text: symbol['text'],
                            //Defines how to handle the text when its size exceeds the given symbol size
                            overflow: 'Wrap'
                        }
                    };
                }
                return {
                    description: {
                        text: symbol.shape['shape']
                    }
                };
            }
        }
        />);
      }
}

        

export default SymbolPalette;

