import React from "react";
import TotalCartPrice from "../TotalCartPrice";
import ImgComponent from "../ImgComponent/ImgComponent";
import './Cart.css';
import minusSVG from '../../assets/img/minusSVG.svg';
import plusSVG from '../../assets/img/plusSVG.svg';

class Cart extends React.Component{

  
  getElId=(el, elFirst)=>{
    if(el==="Color"){
      return elFirst.colorIndex
    }else if(el==="Capacity"){
      return elFirst.capacityIndex
    }else if(el==="With USB 3 ports"){
      return elFirst.withUsbIndex
    }else if(el==="Touch ID in keyboard"){
      return elFirst.withTouchIdIndex
    }else if(el==="Size"){
      return elFirst.sizeIndex
    }
  }

  buttonIndex=(e)=>{
    this.props.addRemoveCart(parseInt(e.target.id), e.target.dataset.cart);
   }

    render(){
      const cartDivs = this.props.allCart.cart.map((element, i)=>{
        return <div className="individual--product " key={JSON.stringify(element)}>
                  <div className="left-cartDiv">
                            <div className="cart--divBrad">{element.cart[0]?.brand}</div>
                            <div className="cart--divName">{element.cart[0]?.name}</div>
                            <div className="cart--divPrices">{element.cart[0]?.prices[this.props.allCart.currency]?.currency.symbol}{element.cart[0]?.prices[this.props.allCart.currency]?.amount}</div>
                            {element.cart[0]?.attributes.map((elAtt, i)=>{
                              return <div key={elAtt.id} className="all-attDivs">
                                      <div className="cart--attName">{elAtt.name}:</div>
                                      <div className="att-divCart">{elAtt.type === "swatch" ? elAtt.items.map((el, i)=>
                                          {return <div key={i} className={`swatch-cartDivv ${this.getElId(elAtt.id, element) === i ? 'swatch-cartDivvBorder': '' } ${el.value === '#FFFFFF' ? 'swatch-cartDivv-a': ''}` } 
                                          style={{backgroundColor:el.value}}></div> }) :
                                      elAtt.items.map((el, i)=>{return <div key={i} className={`alt--divs ${this.getElId(elAtt.id, element) === i ? 'alt--divsAlt': '' }`}>{el.value}</div>})}</div>
                                    </div>
                            })}
                    </div>
                    <div className="rigth-cartDiv unselectable">
                            <div className="buttons-cartDiv">
                              <div className='button-addCart'id={i} data-cart = 'add' onClick={e=>this.buttonIndex(e)} >
                                <img className="plus-SVG" src={minusSVG} alt={minusSVG}></img>
                                <img className="plusTwo-SVG" src={plusSVG}  alt={minusSVG}></img>
                              </div>
                                  <div className='quantity--div'>{element.quantity}</div>
                              <div className='button-subCart'id={i} data-cart ='sub' onClick={e=>this.buttonIndex(e)} >
                                  <img className="plus-SVG" src={minusSVG} alt={minusSVG}></img>
                              </div>
                          </div>
                          <ImgComponent src={element.cart[0]?.gallery}/>
                    </div>
               </div>
      })
        return(
            <div className={`cart--bigDiv ${this.props.allCart.miniCartIsOpen === true ? 'cart-bigDivBackground' :''}`} 
                 onClick={()=>this.props.miniCartOpen(false)}>
              <p className="title-cartP">CART</p>
              {cartDivs}
              <TotalCartPrice cart={this.props.allCart.cart} currencyValue={this.props.allCart.currency} />
            </div>
        )
    }
}

export default Cart