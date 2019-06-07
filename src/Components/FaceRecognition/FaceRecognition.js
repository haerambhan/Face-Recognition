import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (props) => {
    return (
        <div className="container">
            <div className=' center ma bbb'>
                <div className='mt2'>
                    <img id='inputimage' alt='' src={props.url} width='500px' heigh='auto'></img>
                </div>
                {props.x}
            </div>
        </div>
    )
}
export default FaceRecognition;