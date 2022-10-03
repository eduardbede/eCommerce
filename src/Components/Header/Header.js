import React from "react";
/* import { getData } from "../data/fetchData"; */
import SelectCategory from "../SelectCategory";
import data from "../data/data";
import { Link } from "react-router-dom";
import MiniCart from "../Pages/MiniCart";
import img from '../../assets/img/svg 3.png'
import imgUp from '../../assets/img/vectorUp.png'
import imgDown from '../../assets/img/vectorDown.png'
import emptyCart from '../../assets/img/Empty Cart.png'
import './Header.css'
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";


 class Header extends React.Component{

    state = { 
                categories:[],
                currencies:[],
                index:this.props.allCart.index,
            }

  /*   componentDidMount(){
        getData(`query Query {
            categories {
              name
            }
            currencies {
              label
              symbol
            }
          }`).then(data=>{
                 this.setState(data.data)
                }).catch(error=>{
                    console.log(error)
                });
    }; */


    componentDidMount(){
        this.setState(data?.data)
    }

    handleClick = (event) => {
        this.setState({index: parseInt(event.target.id)});
        this.props.changeIndex(parseInt(event.target.id), event.target.dataset.name)
        this.props.functionIsOpen(false)
        };
   
    handleIdSelect=(event)=>{
        this.props.changeCurrency(parseInt(event.target.id))
        this.props.functionIsOpen(false)
    }

    mareFunctie=(e)=>{
        /* e.stopPropagation() */
        this.props.functionIsOpen(false);
        this.props.miniCartOpen(false)
        this.props.menuOpen(false)
    }

    functionCloseCurrency=(e)=>{
        e.stopPropagation();
        this.props.functionIsOpen(!this.props.allCart.isOpen);
        this.props.menuOpen(false)

    }

    functionCloseMenu=(e)=>{
        e.stopPropagation();
        this.props.menuOpen(!this.props.allCart.menuOpen)
        this.props.functionIsOpen(false);
    }

    functionCloseMiniCart=(e)=>{
        e.stopPropagation();
        this.props.miniCartOpen(!this.props.allCart.miniCartIsOpen)
        this.props.menuOpen(false)
    }

    prevClick=(e)=>{
        e.stopPropagation();
        
    }

    render(){
        const date = this.state.categories.map((el, i)=>{
            return <li className= {`li-words ${this.state.index === i ? "li-selected" : ''}`} id={i} data-name={el.name} onClick={e=>this.handleClick(e)} key={el.name}>{el.name.toUpperCase()}</li>
        });
        
        const selectCurrency = this.state.currencies.map((el, i)=>{
            return <div className="select-option" onClick={e=>this.handleIdSelect(e)} id={i} key={el.label}>{el.symbol} {el.label}</div> 
        });
        
        let totalQuantity = [];
        this.props.allCart.cart.map(element=>{
                return totalQuantity =[...totalQuantity, element.quantity];
            });
        const quantityTotal = totalQuantity.reduce((prev, current)=>{return prev+current},0);

        return(
                <nav className="nav-bar" onClick={(e)=>{this.mareFunctie(e)}}>
                    {this.props.allCart.windowSize >= 764 && <SelectCategory date={date}/>}
                    {(this.props.allCart.windowSize <= 764 && this.props.allCart.menuOpen) &&
                        <div className={`absolute--selectCat ${this.props.allCart.menuOpen === true ? "menu--color" : ""}`}>
                            <SelectCategory date={date} menuOpen={this.props.allCart.menuOpen} windowSize={this.props.allCart.windowSize} />
                        </div>
                    }
                        <div className="img-logo">
                            <Link to='/'> <img src={img} alt='img'></img> </Link> 
                        </div>
                        <div className="right-group">
                            <div className="currency-selector" onClick={(e)=>this.functionCloseCurrency(e)}>
                                <div className="currency-currency">{this.state.currencies[this.props.allCart.currency]?.symbol}</div>
                                <img className="img--div" src={this.props.allCart.isOpen ? imgUp : imgDown} alt="img"></img>
                            </div>
                            <div className="currency-select">
                                    {this.props.allCart.isOpen && selectCurrency}
                            </div>
                            <div>
                                <div onClick={(e)=>this.functionCloseMiniCart(e)} className="empty-cart">
                                    {quantityTotal !== 0 && <div className="count--div"><p className={`miniCart-quantity ${quantityTotal >= 100 ? 'miniCart-quantity100' : '' }`}>
                                        {quantityTotal}</p></div>}
                                    <img src={emptyCart} alt='emptyCart'></img>
                                </div>
                                {this.props.allCart.miniCartIsOpen && <div onClick={e=>this.prevClick(e)}><MiniCart cart={this.props.allCart.cart} 
                                                                                currencyValue={this.props.allCart.currency} 
                                                                                addCart={this.props.addCart}
                                                                                miniCartOpen={this.props.miniCartOpen} 
                                                                                /></div> }
                            </div>
                                {this.props.allCart.windowSize < 764 && 
                                <div onClick={(e)=>{this.functionCloseMenu(e)}} className="menu--buttons">
                                   {!this.props.allCart.menuOpen && <AiOutlineMenu size={'25px'} />} 
                                   {this.props.allCart.menuOpen && <GrClose size={'25px'} />}
                                </div>}
                        </div>
                </nav>
           
        )
    }
}
export default Header