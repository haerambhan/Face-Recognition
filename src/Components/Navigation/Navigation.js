import React from 'react';
import './navigation.css';

const nav =(props) =>
{
    return(
        <div className='c1 f3 underline dim link pointer aa pa3'>
            <p onClick={()=>props.onRouteChange('signin')}>Sign Out</p>
        </div>
    )
}

export default nav;