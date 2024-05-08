import React, { useState, useEffect , useRef } from 'react';
import './Drawing.css'

function Drawing(props) {

    const prediction_number = useRef(Math.floor(Math.random() * 10));

    const [pred_status, setPred_status] = useState('Submit');

    const [potato, setPotato] = useState('haha');

    

        
  useEffect(()=>{

    const colour = "#000000";
    const strokeWidth = 12;

    // Drawing state
    let latestPoint;
    let drawing = false;

    // Set up our drawing context
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    

    // Drawing functions
    const continueStroke = newPoint => {
        
        context.beginPath();
        context.moveTo(latestPoint[0], latestPoint[1]);
        context.strokeStyle = colour;
        context.lineWidth = strokeWidth;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineTo(newPoint[0], newPoint[1]);
        context.stroke();

        // update ancre value
        latestPoint = newPoint;
    };

    // Event helpers

    const startStroke = point => {
        drawing = true;
        latestPoint = point;
        
    };

    const BUTTON = 0b01;
    const mouseButtonIsDown = buttons => (BUTTON & buttons) === BUTTON;

    // Event handlers
        
    const mouseMove = evt => {
        
        if (!drawing) {
            return;
        }
        continueStroke([evt.offsetX, evt.offsetY]);
    };

    const mouseDown = evt => {
        props.is_img_empty.current = false
        errMessageNewDraw.textContent = ""
        errMessageEmptyDraw.textContent = ""

        if (props.freeze_drawing.current === false){
            if(props.is_prediction_correct.current !== 'pending'){
                clearCanvas()
                props.update_is_pred_correct()
                props.is_prediction_correct.current  == 'pending'
                setPotato('hihi')
            }
    
            if (drawing) {
                props.update_is_img_empty()
                props.is_img_empty.current = false
                setPotato('h')
                return;
            }
            evt.preventDefault();
            canvas.addEventListener("mousemove", mouseMove, false);
            startStroke([evt.offsetX, evt.offsetY]);
        }
    };

    const mouseEnter = evt => {
        if (!mouseButtonIsDown(evt.buttons) || drawing) {
            return;
        }
        mouseDown(evt);
    };

    const endStroke = evt => {
        if (!drawing) {
            return;
        }
        drawing = false;
        evt.currentTarget.removeEventListener("mousemove", mouseMove, false);
    };

    // Register event handlers

    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", endStroke, false);
    canvas.addEventListener("mouseout", endStroke, false);
    canvas.addEventListener("mouseenter", mouseEnter, false);


    const getTouchPoint = evt => {
        if (!evt.currentTarget) {
            return [0, 0];
        }
        const rect = evt.currentTarget.getBoundingClientRect();
        const touch = evt.targetTouches[0];
        return [touch.clientX - rect.left, touch.clientY - rect.top];
    };

    const touchStart = evt => {
        props.is_img_empty.current = false
        errMessageNewDraw.textContent = ""
        errMessageEmptyDraw.textContent = ""

        if (props.freeze_drawing.current === false){


            if(props.is_prediction_correct.current !== 'pending'){
            clearCanvas()
            props.update_is_pred_correct()
            props.is_prediction_correct.current  == 'pending'
            setPotato('hihi')
                }
            
            if (drawing) {
                props.update_is_img_empty()
                props.is_img_empty.current = false
                setPotato('h')
                return;
                }
            evt.preventDefault();
            startStroke(getTouchPoint(evt));
            }
    };

    const touchMove = evt => {
        if (!drawing) {
            return;
        }
        continueStroke(getTouchPoint(evt));
    };

    const touchEnd = evt => {
        drawing = false;
    };

    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchend", touchEnd, false);
    canvas.addEventListener("touchcancel", touchEnd, false);
    canvas.addEventListener("touchmove", touchMove, false);


    const clearCanvas= ()=>{
        errMessageNewDraw.textContent = ""
        context.clearRect(0,0,canvas.width,canvas.height)
        props.update_is_pred_correct()
        props.is_prediction_correct.current  == 'pending'
        props.is_img_empty.current = true
        setPotato('hihii')
    }


    const checkInput = () =>{

        inputuser.value = inputuser.value.replace(/[^a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, '');

        if (inputuser.value.trim() === ""){
            errorMessageElement.textContent = "Name cann't be empty"
        } else {
            errorMessageElement.textContent = ""
        }
    }
    const submitImage = async () => {

        if(inputuser.value.trim() !== ""){
            if (props.is_img_empty.current === false){
                if (props.is_prediction_correct.current === 'pending'){
                    errMessageNewDraw.textContent = ""
                    errMessageEmptyDraw.textContent = ""
                    props.freeze_drawing.current = true
                    setPred_status('waitingResults')
                    setPotato('hoho')
                    const img_url = canvas.toDataURL()
                    
                    await fetch(img_url)
                    .then(res => res.blob())
                    .then(blob =>{
            
                        const formData = new FormData(); 
                        formData.append('img', blob, 'img.png');
            
                        const params = new URLSearchParams({
                            user_name: inputuser.value,
                            prediction_number: prediction_number.current
                          });
                        props.predict(params,formData)
                        .then((data)=>{
                            prediction_number.current = Math.floor(Math.random() * 10)
                            props.freeze_drawing.current = false
                            setPred_status('Submit')
                        })
                    })

                } else {
                    errMessageNewDraw.textContent = "Please submit a new image..."
                }

            } else {
                errMessageEmptyDraw.textContent = "Please don't submit empty images..."
            }
            
        }
    }


    const clearButton = document.getElementById('clear');
    const submitButton = document.getElementById('submit');
    const inputuser = document.getElementById('input_name');
    const errorMessageElement = document.getElementById("errMessage");
    const errMessageEmptyDraw = document.getElementById("errMessageEmptyDraw");
    const errMessageNewDraw = document.getElementById("errMessageNewDraw");
    
    
    return () => {
        inputuser.defaultValue = props.user_name;
        clearButton.addEventListener('click', clearCanvas);
        submitButton.addEventListener('click', submitImage);
        inputuser.addEventListener('input',checkInput)
    }
  },[])


  useEffect(()=> {


    })




  return (
    <>
        <div className='container drawing'>
            <div className='row'>
                <p>Draw the number <strong>( {prediction_number.current} )</strong></p>
                <div className='drawing elements'>
                    <canvas id="canvas" width="300" height="300" className={props.is_prediction_correct.current}></canvas>
                    <div>
                        <div className={'input-div '+pred_status}>
                            <div>Name: <input type="text" id="input_name" maxLength="17" /></div>
                            <b><ul id='errMessage'></ul></b>
                            <b><ul id='errMessageEmptyDraw'></ul></b>
                            <b><ul id='errMessageNewDraw'></ul></b>
                        </div>
                        <div className='row'>
                            <div className='submit-div'>
                                <button id='clear' className={pred_status}>Clear</button>
                                <button id="submit" className={pred_status}>Submit</button>
                                <div className={pred_status} id='loadingScreen'>
                                    <div className="loader"></div> Loading...
                                </div>                            
                            </div>
                            <div className={'wrong-pred '+props.is_prediction_correct.current}>Model predicted <strong>{props.prediction_result.current}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Drawing
