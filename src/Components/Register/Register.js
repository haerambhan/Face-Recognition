import React from 'react';

class Register extends React.Component
{
    state={
        email:'',
        name:'',
        password:''
    }
    onEmailChange =(event) => {
        this.setState({ email: event.target.value})
    }
    onNameChange =(event) => {
        this.setState({ name: event.target.value})
    }
    onPasswordChange =(event) => {
        this.setState({ password: event.target.value})
    }
    onSumbitRegister = () => {
        if(this.state.email==='' || this.state.name==='' || this.state.password==='')
        {
            this.props.onRouteChange('empty'); 
        }
        else
        {
            fetch('https://magic-brain-backend.firebaseapp.com/register',{
            method:'post',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({
               email: this.state.email,
               name: this.state.name,
               password: this.state.password
               })
            })
            .then(response => response.json())
            .then(res => {
                if(res==='success'){
                    this.props.onRouteChange('created');
                }
                else{
                    this.props.onRouteChange("exists")
                }
            })  
        }
    }
    render(){
        return(
            <div className= 'shadow-1 card lala'>
                <div className="sample"></div>
                <h1 className='dark-green'>REGISTER</h1>
                <input className='ph3 pv2 center ma2 mb3 ba bw1 b--dark-green bg-transparent' onChange={this.onEmailChange}  type="text" placeholder="Enter Username" required/>
                <input className='ph3 pv2 center ma2 mb3 ba bw1 b--dark-green bg-transparent' onChange={this.onNameChange}  type="text" placeholder="Enter Full Name" required/>
                <input className='ph3 pv2 center ma2 mb3 ba bw1 b--dark-green bg-transparent' onChange={this.onPasswordChange} type="password"  placeholder="Enter Password" required/>
                <a className="f6 link dim br1 ba bw1 ph3 pv2 mb2 dib dark-greenz" href="#0" onClick={this.onSumbitRegister}>Sign Up</a><br></br>
                <a className="f6 link dim br1 ba bw1 ph3 pv2 mb2 dib dark-green" href="#0" onClick={()=>this.props.onRouteChange('signin')}>Go to Login Page</a>

            </div>
        )
    }
    
}

export default Register;