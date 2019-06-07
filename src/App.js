import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Title from './Components/Title/Title';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';




const app = new Clarifai.App({
  apiKey: 'bb5efa567c684d078975b280c88620bf'
 });

let val='';
class App extends Component {

  state={
    imgUrl:'',
    route:'signin',
    box:[],
    user:{
      id: '',
      name: '',
      email: '',
    },
    boxArray:[] 
  }
  
  onInputChange=(event)=>
  {
     val=event.target.value;
  }
  onRouteChange=(r)=>
  {
    this.setState(
      {route:r}
    )
    if(r==='signin')
    {
      this.setState(
        {imgUrl:''}
      )
    }
  }
  loadUser=(data) =>
  {
    this.setState(
      {user:{
        id: data.id,
        name: data.name,
        email: data.email,
      }} 
    )
  }
  calculateFaceLocation = (datas) => {
    this.setState({
      box:[]
    });
    var x=this.state.box;
    datas.outputs[0].data.regions.forEach( region => {
      const clarifaiFace = region.region_info.bounding_box;
      const image = document.querySelector('#inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      var tempbox = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
      x.push(tempbox)    
    }) 
    this.setState(
      {
        box:x
      }
    )
    var m=[];
    this.state.box.forEach((box) => {
      m.push(<div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}> </div>);
   })
   this.setState(
     {
       boxArray:m
     }
   )} 
  onClick=()=>
  {

    this.setState({imgUrl:val});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, val)
    .then( response => this.calculateFaceLocation(response))
    .catch(err => console.log(err));
  }

  render() 
  {
    let control={};
    if(this.state.route==='signin')
    {
      control=(
        <div>
          <Title/>
          <Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        </div>        
      )
    }
    else if(this.state.route==='register')
    {
      control=(
        <div>
          <Title/>
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        </div>
       
      )
    }
    else if(this.state.route==='home')
    {
      control=(
        <div>
          <Navigation onRouteChange={this.onRouteChange}/>
          <Logo/>
          <Rank user={this.state.user}/>
          <ImageLinkForm change={this.onInputChange} click={this.onClick}/>
          <FaceRecognition url={this.state.imgUrl}  x={this.state.boxArray}/>
        </div>
      )
    }
    else if(this.state.route==='exists')
    {
      control=(
        <div>
          <Title/>
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          <h1 className = "center dark-red f4">User already Exists</h1>
        </div>
        
      )
    }
    else if(this.state.route==='invalid')
    {
      control=(
        <div>
          <Title/>
          <Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          <h1 className = "center dark-red f4">Wrong Username or Password</h1>
        </div>
        
      )
    }
    else if(this.state.route==='empty')
    {
      control=(
        <div>
          <Title/>
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          <h1 className = "center dark-red f4">Fields cannot be empty</h1>
        </div>
        
      )
    }
    else if(this.state.route==='created')
    {
      control=(
        <div>
          <Title/>
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          <h1 className = "center dark-green f4">New User Created</h1>
        </div>
        
      )
    }

    return (

      <div>
         {control}
      </div>
       
    );
  }
}

export default App;


