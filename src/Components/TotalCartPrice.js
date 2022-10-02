import React, { Component } from 'react'
import './TotalCartPrice.css'

export default class TotalCartPrice extends Component {

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

            const taxTotal = 21/100 * calculateTotal;
    return (
      <div className='total-cartPrices'>
            <div className='tax-div'>TAX 21%: </div>
            <div className='total-taxDiv'>{total.symbol}{taxTotal.toFixed(2)}</div>
            <div className='total-quantityDiv'>Quantity:</div>
            <div className='total-quantityPrices'>{quantityTotal}</div>
            <div className='total-Divv'>Total:</div>
            <div className='total-priceCartDiv'>{total.symbol}{calculateTotal}</div>
            <button className='button-cartOrder' onClick={()=>console.log(`Order Successfully`)}>ORDER</button>
      </div>
    )
  }
}
