import { file } from "@babel/types";
import React, { useMemo, CSSProperties, useCallback } from "react";
import { Suspense, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import serverApiHost,{port} from "../../global";
import IDataCardSection from "../Data/IDataCardSection";

import { Box } from '@material-ui/system';
import CircularProgress from '@mui/material/CircularProgress';

import Button from '@material-ui/core/Button';
import axios from 'axios'
//import './DropZone.css'


const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10%",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DropZone = (props: {}) => {

  const [state, setState] = useState({
    loading: false,
    data: null,
    sections: new Array() as IDataCardSection[],
  })

  var listSections: IDataCardSection[] = new Array()

  const SendFile = (acceptedFiles: File[]) => {
    //
    (async () => {
      setState({...state, data: null});
      if (acceptedFiles.length > 0) {
        try {
          let file = acceptedFiles[0];
          console.log("file = ", file);

         // setLoading(true);
         setState({...state, loading: true});
          /* 
              console.log("name = ",JSON.stringify({
                FileName: file.name,
                Size: file.size
              }))*/

          var data = new FormData();
          data.append("file", file);


          const response = await axios.post('http://'+serverApiHost+':'+port+'/api/exel/add',data,
          {
              headers: {
                "Access-Control-Allow-Origin": "*",
               // 'Content-Type': 'application/json'
                'Content-Type': 'multipart/form-data'
              }
          })

          if(response.status != 200)
          {
            return ;
          }

          let content = response.data as any;

          console.log("name = ", response);

          let section: IDataCardSection = {
            sections: new Array
          }; 

          if(content != null)
          {
            content.dataCardVSM.map((item : any, index: number)=> {
              if(section.sections?.length === 0)
              {
                section.sections?.push(item.value);
              }
              else
              {
                let position = section.sections[section.sections.length-1].etapNumeric;
                if(item.value.etapNumeric === position)
                {
                  section.sections?.push(item.value);
                }
                else
                {
                  listSections.push(section);

                  section = {
                    sections: new Array
                  } as IDataCardSection;

                  section.sections?.push(item.value);

                }
              }
            })
                   
            console.log("listSections", listSections)
          }


            setState({...state, data: content, sections: listSections, loading: false});
    
        } catch (e) {}
      }
    })();
    //
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log("useCallback = ", acceptedFiles);
    SendFile(acceptedFiles);
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  ) as CSSProperties;

  const files = acceptedFiles.map((file) => (
    <div style={{ flex: "" }} key={file.name}>
      <li>
        {file.name} - {file.size} bytes
      </li>
      <Button color="info"  onClick={() => SendFile(acceptedFiles)}>
        Отправить
      </Button>
    </div>
  ));

  useEffect(() => {});

  if (state.loading) {
    return (
      <div>
        <Suspense fallback={<CircularProgress />}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        </Suspense>
      </div>
    );
  }

  if (state.sections.length > 0) {
    console.log("CARDS = ", state.sections);
    return (
      <div style={{display: 'flex', height: '100%'}}>
        <Button color="info"  onClick={() => setState({...state, data: null, sections: []})}>
          Вренуться
        </Button>
        {/*<Demo2 sections={state.sections}/>*/}
      </div>
      
    );
  }
  //<Demo sections={state.sections}/>
  //sections={state.sections}/

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} type="file" />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default DropZone;
