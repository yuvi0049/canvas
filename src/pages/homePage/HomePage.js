import React from 'react';
import InputField from '../../components/InputField';
import Canvas from '../../components/Canvas';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import dimensionConv from '../../algorithms/dimensionConv';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-around'
    },
  }));

  let childKey = 0;

  export default function HomePage() {
    const classes = useStyles();
    const [state, setState] = React.useState('');
    
    let canvasReference;

    const createCanvas = (templateJSON, dimension) => {
        if (canvasReference) {
            canvasReference.dispose();
        }

        setState(dimensionConv({ templateJSON, dimension}));
    };

    const setCanvasObject = (canvas) => {
        canvasReference = canvas;
    }

    ++childKey;
    return(
        <Grid container className={classes.root}>
            <Grid item xs={12} md={4}>
                <InputField onCreate={(templateJSON, dimension) => createCanvas(templateJSON, dimension)} />
            </Grid>
            <Grid item xs={12}>
                <Canvas layers={state} setCanvas={setCanvasObject} key={childKey} />
            </Grid>
        </Grid>
    );
  };