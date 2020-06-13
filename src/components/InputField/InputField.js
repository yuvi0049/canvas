import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import validateJSON from '../../algorithms/validateJSON';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      border: '1px solid rgba(0, 0, 0, 0.42)',
    }
  },
  }));


export default function InputField(props) {
    const classes = useStyles();
    const [templateJSON, setJSON] = React.useState('');
    const [dimension, setDimension] = React.useState('');

    const handleChangeForText = (event) => {
      setJSON(event.target.value);
    };

    const handleChangeForSelect = (event) => {
      setDimension(event.target.value);
    };

    const createCanvas = (defaultRender) => {
      if (defaultRender) {
        if (validateJSON(templateJSON)) {
          props.onCreate(templateJSON);
        } else{
          alert("Not Valid JSON");
        }
      } else {
        if (validateJSON(templateJSON) && dimension) {
          props.onCreate(templateJSON, dimension);
        } else {
          if (!validateJSON(templateJSON)) {
            alert("Not Valid JSON");
          } else if (!dimension) {
            alert("Select Dimension");
          }
        }
      }
    };

    return (
      <Fragment>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="standard-multiline-static"
                label="Enter your JSON here"
                multiline
                value={templateJSON}
                onChange={handleChangeForText}
                rows={18}
              />

              <Button variant="contained" color="primary" onClick={() => createCanvas(true)} style={{margin: '80px 10px'}}>
                Render Default Canvas
              </Button>

              <FormControl className={classes.formControl} style={{margin: '10px'}}>
                <Select
                  value={dimension}
                  onChange={handleChangeForSelect}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="" disabled>Select Dimension</MenuItem>
                  <MenuItem value={1}>Vertical</MenuItem>
                  <MenuItem value={2}>Horizontal</MenuItem>
                  <MenuItem value={3}>Square</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button variant="contained" color="primary" onClick={() => createCanvas(false)} style={{margin: '10px'}}>
              Create Canvas
            </Button>
          </form>
      </Fragment>
    );
};