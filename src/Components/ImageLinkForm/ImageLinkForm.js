import React from 'react';
import './imagelinkform.css';

const ImageLinkForm = (props) =>
{
    return(
        <div className= 'f3 dark-green shadow-1 card2 mv3 pa3 '>
             <div className="sample"></div>  
             <div className='container i mv3'>Magic Brain will detect faces in your image</div>      
            <div className='container mv3'>
                <input className='lin w-80 f6 ph3 pv2 ma2 ba bw1 bg-transparent b--dark-green br4' type='tex' placeholder='Enter url' onChange={props.change}/>
                <a className="dim link f6 ph3 pv2 ma2 ba bw1 br1 dib dark-green " href="#0" onClick={props.click}>Detect </a>
            </div>
        </div>
    )
}
export default ImageLinkForm;