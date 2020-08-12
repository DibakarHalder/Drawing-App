import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./styles.scss";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Eraser from "../../SvgComponents/Eraser";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: 10,
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Canvas({ history, match }) {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [usePen, setUsePen] = useState(true);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [penColor, setPenColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");

    if (window.localStorage.getItem(match.params.id)) {
      var img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
      img.src = JSON.parse(window.localStorage.getItem(match.params.id));
    }

    context.lineCap = "round";
    context.strokeStyle = penColor;
    context.lineWidth = strokeWidth;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    var image = canvasRef.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(image);
    window.localStorage.setItem(match.params.id, JSON.stringify(image));
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    if (usePen) {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    } else {
      contextRef.current.clearRect(offsetX, offsetY, 10, 10);
    }
  };

  const handleChange = (event) => {
    setStrokeWidth(event.target.value);
    contextRef.current.lineWidth = event.target.value;
  };
  console.log(history, match);
  return (
    <div className="canvas-container">
      <div className="options row align-center">
        <Button
          variant="contained"
          color="default"
          endIcon={<EditIcon />}
          onClick={() => {
            setUsePen(true);
          }}
        >
          Pen
        </Button>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Stroke Size</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={strokeWidth}
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <input
          type="color"
          onChange={(e) => {
            setPenColor(e.target.value);
            contextRef.current.strokeStyle = e.target.value;
          }}
        />
        <Button
          variant="contained"
          color="default"
          style={{ marginLeft: 10 }}
          endIcon={<Eraser />}
          onClick={() => {
            setUsePen(false);
          }}
        >
          Eraser
        </Button>
      </div>
      <canvas
        className={`canvas ${usePen ? "pen" : "eraser"}`}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}
