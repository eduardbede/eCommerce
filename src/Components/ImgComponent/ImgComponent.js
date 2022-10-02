import React, { Component } from 'react'
import LeftButton from '../../assets/img/LeftButtonPhoto.svg';
import RightButton from '../../assets/img/RightButtonPhoto.svg';
import './ImgComponent.css'

class ImgComponent extends Component {

    state ={
        img:0,
        }

    nextImgLeft=()=>{
        if(this.state.img === this.props.src?.length - 1){
            this.setState({img:0});
        } else this.setState(prevState=>{
            return {img:prevState.img + 1};
        });
    };

    nextImgRight=()=>{
        if(this.state.img === 0){
            this.setState({img:this.props.src?.length - 1});
        } else this.setState(prevState=>{
            return {img:prevState.img - 1}
        });
       
    };

    
  render(){
    return(
           <div className="right--imgDiv unselectable">
                <img className="right--imgImg" src={this.props.src?.[this.state.img]} alt={this.props.src[this.state.img]}></img>
               {this.props.src?.length !== 1 && <div className="left-CarouselButton" data-name="left" onClick={(e)=>this.nextImgLeft(e)}>
                <img className="left-CarouselImg" src={RightButton} alt={LeftButton}></img></div>} 
               {this.props.src?.length !== 1 && <div className="right-CarouselButton" data-name='right' onClick={(e)=>this.nextImgRight(e)} >
                <img className="right-CarouselImg" src={LeftButton} alt={RightButton}></img></div>}
           </div> 
    )
  }
}


export default ImgComponent