import React from "react"
import Home from "./Components/Pages/Home"
import Header from "./Components/Header/Header"
import { BrowserRouter } from "react-router-dom"

export default class App extends React.Component {
  
  state = JSON.parse(localStorage.getItem('saveObj')) || {
          currency:0,
          index:0,
          catName:'all',
          isOpen:false,
          miniCartIsOpen:false,
          cart:[],
          windowSize: window.innerWidth,
          menuOpen:false
        }

  componentDidUpdate(prevProps, prevState){
      if(JSON.stringify(prevState) !== JSON.stringify(prevProps)){
        localStorage.setItem('saveObj', JSON.stringify(this.state));
      }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  //function that open menu
  menuOpen=(param)=>{
    this.setState(prevState=>{
      return {...prevState, menuOpen:param}
    })
  }

  changeIndexChild = (id, name) =>{
      this.setState({index:id, catName:name});
  }

  changeCurrency =(index)=>{
      this.setState({currency:index})
  }

  changeIsOpen =(change)=>{
    this.setState({
      isOpen: change,
      miniCartIsOpen: false,
    })
  }

  miniCartIsOpen=(pass)=>{
    this.setState({
                    miniCartIsOpen: pass,
                    isOpen:false
                  })
  }

//function that add product to array
  pushCart=(cartPush)=>{
      const id = this.state.cart.findIndex(el=>{
        return (el.cart[0]?.id === cartPush.cart[0]?.id) && (el.colorIndex === cartPush.colorIndex) && (el.capacityIndex === cartPush.capacityIndex)
               && (el.sizeIndex=== cartPush.sizeIndex) && (el.withTouchIdIndex === cartPush.withTouchIdIndex) &&
               (el.withUsbIndex === cartPush.withUsbIndex);
      });
      if(id === -1){
        this.setState(prevState=>({cart:[...prevState.cart, cartPush]}));
      } else{
        this.setState(prevState=>{
          return {...prevState, cart:prevState.cart.map(el=>{
            if((el.cart[0]?.id === cartPush.cart[0]?.id) && (el.colorIndex === cartPush.colorIndex) && (el.capacityIndex === cartPush.capacityIndex)
            && (el.sizeIndex=== cartPush.sizeIndex) && (el.withTouchIdIndex === cartPush.withTouchIdIndex) &&
            (el.withUsbIndex === cartPush.withUsbIndex)){
              return {...el, quantity:el.quantity+1}
            }return el
         })}
        })
      }
  }

  modifyProduct=(index, data)=>{
    if(data === 'sub'){
      this.setState(prevState=>{
        return{...prevState, cart:prevState.cart.map((el, i)=>{
            if(index === i){
            return{...el, quantity: el.quantity-1};
           } return el
        })};
      });
    } else if(data === 'add'){
      this.setState(prevState=>{
        return{...prevState, cart:prevState.cart.map((el, i)=>{
           if(index===i){
            return{...el, quantity: el.quantity+1}
           } return el
        })}
      })
    }
     this.setState(prevState=>{return{...prevState, cart:prevState.cart.filter(el => el.quantity !== 0)}});
    }

//reisze function, get width window size
    handleResize=()=>{
      this.setState({windowSize:window.innerWidth, menuOpen:false})
  }

  render(){
      return (
        <BrowserRouter>
              <Header allCart={this.state}
                      changeIndex={this.changeIndexChild}
                      changeCurrency={this.changeCurrency}
                      functionIsOpen={this.changeIsOpen}
                      miniCartOpen={this.miniCartIsOpen}
                      addCart={this.modifyProduct}
                      menuOpen={this.menuOpen}
                      />
              <Home allCart={this.state}
                    cartAdd={this.pushCart}
                    miniCartOpen={this.miniCartIsOpen}
                    addRemoveCart={this.modifyProduct}
                    addCart={this.modifyProduct}
                    menuOpen={this.menuOpen}
              />
        </BrowserRouter>
        
      )
  }
}
