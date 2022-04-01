import * as React from 'react';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import TableViewIcon from '@mui/icons-material/TableView';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

const   ToggleButtonMy = (props:{ alignment: string, handleChange: (event: React.MouseEvent<HTMLElement>, value: any) => void  }) =>  {
  

  const children = [
    <ToggleButton value="left" key="left">
      <TableViewIcon/>
    </ToggleButton>,
    <ToggleButton value="center" key="center">
      <ViewComfyIcon />
    </ToggleButton>,
  ];

  const control = {
    value: props.alignment,
    onChange: props.handleChange,
    exclusive: true,
  };

  return (
    <div>
       <ToggleButtonGroup size="small" {...control}>
        {children}
      </ToggleButtonGroup>
    </div>
  );
}
export default ToggleButtonMy;