// 1. Install dependencies , react-webcam, tensorflowjs, tf-face-landmarks-detection which creates 486 3d facial landmarks for attributes recognition
// 2. Import dependencies
// 3. Setup webcam and canvas
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow
// 8. Draw functions DONE

import React, {useRef, useEffect} from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
//mui
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import {drawMesh} from "./Components/utilities";

//components
import MyAppBar from "./Components/MyAppBar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 25,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#333",
    // height: 500,
  },
}));

const App = () => {
  const classes = useStyles(); //to use mui style

  //ref values to be mutated by tensor flow functions
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load posenet
  const runFacemesh = async () => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    setInterval(() => {
      detect(net);
    }, 10); //run every 10ms to create a mesh
  };

  // takes video properties
  const detect = async net => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces({input: video});
      console.log(face);

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  useEffect(() => runFacemesh(), []);

  return (
    <div className="App">
      <MyAppBar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className="canvasContainer">
                <Webcam
                  ref={webcamRef}
                  style={{
                    // position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                  }}
                />
                {/* To display the captured footage */}
                <canvas
                  ref={canvasRef}
                  // super imposed on webcam
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                  }}
                />
              </div>
              <p>
                Please look directly at the camera. Ensure you are in a well lit
                environment.
              </p>
              <p>
                Allow some time for facial attributes recognition system to kick
                in (usually within 10 sec)
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <footer>
        <div class="copyright">
          <p style={{color: "black"}}>UTS Engineering Capstone</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
