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

      canvas.loadFromJSON(JSON.stringify(props.layers), canvas.renderAll.bind(canvas), function(o, object) {
        if (object.subType === "TEXT") {
          const text = new fabric.Text(object.text, {
            fontFamily: object.fontFamily,
            fontStyle: object.fontStyle,
            textAlign: object.textAlign,
            fontFamily: object.fontFamily,
            lineHeight: object.lineHeight,
            fontSize: object.fontSize,
            left: object.left,
            top: object.top + object.height
          });
          
          canvas.add(text);
        }

        canvas.renderAll();
      });

      props.layers && window.scrollTo({
        top: document.getElementsByClassName('makeStyles-root-2')[0].clientHeight + 50,
        behavior: "smooth"
      });

      props.setCanvas(canvas);
    }, [props.layers])

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const saveCanvas = () => {
      const fileDownload = require('js-file-download');
      fileDownload(canvas.toJSON(), 'downloadCanvas.json');
    }

    return (
        <div>
          {props.layers ? (<Fragment>
            <div className={classes.root}>
              <h3>Your Canvas here</h3>
              <canvas ref={canvasRef} width={1240} height={1240} />
            </div>

            <Button variant="contained" color="primary" onClick={saveCanvas} style={{margin: '10px'}}>
              Save this Canvas
            </Button>
          </Fragment>) : ''}
        </div>
    );
};