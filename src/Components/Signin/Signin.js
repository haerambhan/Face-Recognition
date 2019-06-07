import React from 'react';

class Signin extends React.Component
{
    state={
        signInEmail:'',
        signInPassword:''
    }
    onEmailChange =(event) => {
        this.setState({ signInEmail: event.target.value})
    }
    onPasswordChange =(event) => {
        this.setState({ signInPassword: event.target.value})
    }
    onSumbitSignin = () => {
        fetch('https://magic-brain-backend.firebaseapp.com/login',{
           method:'post',
           headers:{'content-type':'application/json'},
           body: JSON.stringify({
               email: this.state.signInEmail,
               password: this.state.signInPassword
           })
        })
        .then(response => response.json())
        .then(data => {
            if(data !=='Wrong Password' && data !== 'No such User exists')
            {
                this.props.loadUser(data)
                this.props.onRouteChange('home');
            }
            else{
                this.props.onRouteChange('invalid')
            }
        })  
    }
    render(){
        return(
            <div className='lala'>
                <div className='shadow-1 card '>
                    <div className="sample"></div>
                    <h1 className='dark-green'>
                        SIGN IN
                    </h1>
                    <input onChange = { this.onEmailChange } className='ph3 pv2 center ma2 zba bw1 b--dark-green bg-transparent' type="text" placeholder="Enter Username"/>
                    <input onChange = { this.onPasswordChange } className='ph3 pv2 center ma2 mb3 ba bw1 b--dark-green bg-transparent' type="password" placeholder="Enter Password"/>
                    <a className="f6 link dim br1 ba bw1 ph3 pv2 mb2 dib dark-green" href="#0" onClick={ this.onSumbitSignin}>Login</a><br></br>
                    <a className="f6 link dim br1 ba bw1 ph3 pv2 mb2 dib dark-green" href="#0" onClick={ () => this.props.onRouteChange('register')}>Create New Account</a>
                </div>
            </div>
            
        )
    }   
}

export default Signin;
