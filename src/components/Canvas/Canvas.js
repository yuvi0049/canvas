import React, { useRef, useEffect, Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.42)',
  },
}));

export default function Canvas(props) {
    const canvasRef = useRef(null)
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    let canvas;

    useEffect(() => {
      const fabric = window.fabric;
      canvas = new fabric.Canvas(canvasRef.current, { 
        preserveObjectStacking:true,
        backgroundColor : "#000"
      });

      canvas.loadFromJSON(JSON.stringify(props.layers), canvasLoaded);

      const classForScroll = document.getElementsByClassName('makeStyles-root-2')[0];

      props.layers && window.scrollTo({
        top: classForScroll && classForScroll.clientHeight + 50,
        behavior: "smooth"
      });
    }, [props.layers]);

    const canvasLoaded = () => {
      canvas.renderAll.bind(canvas);
      const objs = props.layers['objects']; 

      for(let i=0;objs && i< objs.length; i++){
        if(objs[i].hasOwnProperty('subType')){
          const fabric = window.fabric;

          if (objs[i].subType === "TEXT") {
            const text = new fabric.Text(objs[i].text, {
              fontFamily: objs[i].fontFamily,
              fontStyle: objs[i].fontStyle,
              textAlign: objs[i].textAlign,
              fontFamily: objs[i].fontFamily,
              lineHeight: objs[i].lineHeight,
              fontSize: objs[i].fontSize,
              left: objs[i].left,
              top: objs[i].top + objs[i].height
            });
            
            canvas.add(text);
          } 

          fabric.util.requestAnimFrame(function render() {                      
            canvas.renderAll();                     
            fabric.util.requestAnimFrame(render);                
          });
        }
     }
    }

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const saveCanvas = () => {
      const fileDownload = require('js-file-download');
      fileDownload(canvas.toJSON(), 'downloadCanvas.json');
    }

    return (
        <Fragment>
          {!!props.defaultRender ? (
            <div className={classes.root}>
              <canvas ref={canvasRef} width={920} height={720} />
            </div>) : ''}

          {!!Object.keys(props.layers).length && !props.defaultRender ? (<Fragment>
            <div className={classes.root}>
              <h3>Your Canvas here</h3>
              <canvas ref={canvasRef} width={1080} height={1080} />
            </div>

            <Button variant="contained" color="primary" onClick={saveCanvas} style={{margin: '10px'}}>
              Save this Canvas
            </Button>
          </Fragment>) : ''}
        </Fragment>
    );
};