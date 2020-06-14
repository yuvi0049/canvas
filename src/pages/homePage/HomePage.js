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

let childKey = 0,
    childDefaultKey = 0;

export default function HomePage() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        default: '',
        custom: ''
    });
    
    const createCanvas = (templateJSON, dimension) => {
        if (dimension) {
            setState({...state, custom: dimensionConv({ templateJSON, dimension}, false)});
        } else {
            setState({...state, default: dimensionConv({ templateJSON }, true)});
        }
    };

    ++childKey;
    ++childDefaultKey;
    return(
        <Grid container className={classes.root} spacing={0}>
            <Grid item xs={12} md={3} style={{padding: '5px'}}>
                <InputField onCreate={(templateJSON, dimension) => createCanvas(templateJSON, dimension)} />
            </Grid>

            <Grid item xs={9} style={{padding: '5px'}}>
                <Canvas layers={state.default} key={childKey} defaultRender={true} />
            </Grid>

            <Grid item xs={12}>
                <Canvas layers={state.custom} key={childDefaultKey} />
            </Grid>
        </Grid>
    );
};