import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./MiniCart.css"

export default class MiniCart extends Component {
 
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
 
    this.props.addCart(parseInt(e.target.id), e.target.dataset.cart);
 
 }


 
  render() {

    let total = {
                  price:[],
                  quantity:[],
                  symbol:''
                };

      this.props.cart.map(element=>{
        return element.cart.map(el=>{
         return total ={ quantity:[...total.quantity, element.quantity], 
                         price:[...total.price, el.prices[this.props.currencyValue]?.amount * element.quantity],
                         symbol:el.prices[this.props.currencyValue]?.currency.symbol
                        };
        });
      });
  const calculateTotal = total.price.reduce((prev, current)=>{return prev + current},0).toFixed(2);
  const quantityTotal = total.quantity.reduce((prev, current)=>{return prev + current},0);


    const miniCart = this.props.cart.map((elFirst, i)=>{
      return <div key={i} className="all--items">
                  <div className='total-items'>
                    {elFirst.cart.map((el, i)=>{
                      return <div className='detail--divv'  key={i}>
                                  <div className='name--divMini'>{el.brand}</div>
                                  <div className='name--divMini'>{el.name}</div>
                                  <div className='price--divMini'>{el.prices[this.props.currencyValue]?.currency.symbol}{el.prices[this.props.currencyValue]?.amount}</div>
                                  <div>{el.attributes.map((element,i)=>{
                                    return<div key={i}>
                                              <div className='mini--divName'>{element.name}:</div>
                                              <div className='att-divv'>
                                                {element.type === 'swatch' ? element.items.map((el,i)=>{return <div key={i} className={`swatch ${this.getElId(element.id, elFirst) === i ? "swatch--border" : ''} ${el.value === '#FFFFFF' ? 'swatch-a': ''}`} style={{backgroundColor:`${el.value}`}}></div>}) : 
                                                element.items.map((el,i)=>{return <div key={i} className={`normal-att ${this.getElId(element.id, elFirst) === i && "att-selected"}`}>{el.value}</div>})}
                                              </div>
                                          </div>
                                  })}</div>
                                
                             </div>
                    })}
                      <div className='add--removeItem'>
                        <button className='button-add' data-cart ='add' onClick={e=>this.buttonIndex(e)} id={i}>+</button>
                            <div className='quantity--div'>{elFirst.quantity}</div>
                        <button className='button-sub' data-cart ='sub'onClick={e=>this.buttonIndex(e)} id={i}>-</button>
                      </div>
                      <div className='img--divMini'>
                          <img className='img-miniCart' src={elFirst.cart[0]?.gallery[0]} alt={elFirst.cart[0]?.gallery[0]}></img>
                      </div>
                  </div>
            </div>
    });
    return (
        <div className="mini--cart scroll">
          <div className='cart--numItems'>
            <p className='first--bag'>My Bag, </p>
            <p className='second--bag'>{quantityTotal} items</p>
          </div>
          {miniCart}
              <div className='totals--divs'>
                  <div className='price-totallDiv'>Total:</div>
                  <div className='all--priceDiv'>{total.symbol}{calculateTotal}</div>
              </div>
              <div className='buttons--divs'>
                  <Link to='/cart/' ><button onClick={()=>{this.props.miniCartOpen(false)}}  className='left-bagButton'>VIEW BAG</button></Link>
                  <button className='right-bagButton'>CHECK OUT</button>
              </div>
        </div>
    )
  }
}
