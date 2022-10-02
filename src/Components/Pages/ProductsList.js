import React from "react";
import data from "../data/data";
import { Link  } from "react-router-dom";
import "./ProductsList.css"
import { getData } from "../data/fetchData";
import EmptyCart from '../../assets/img/EmptyCartButton.svg'


class ProductsList extends React.Component{
    state = {categories:[],
              indexAttributes:{
                cart:[],
                colorIndex:0,
                capacityIndex:0,
                sizeIndex:0,
                withUsbIndex:0,
                withTouchIdIndex:0,
                quantity:0
            },}
    
    /* componentDidMount(){
        getData(`query Query {
          categories {
            name
            products {
              id
              name
              inStock
              gallery
              description
              category
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
              brand
            }
          }
        }`).then(data=>{
                 this.setState(data.data);
                }).catch(error=>{
                  console.log(error)
              });
    } */

    componentDidMount(){
      this.setState(data?.data);
    }

    //funciton add product form list
    getId=(e)=>{
      if(this.state.categories.length === 0){
          return [];
      } else {
        this.setState(prevState=>{
          return {...prevState, indexAttributes:{...prevState.indexAttributes, 
                            cart:this.state.categories[0]?.products.filter(el=>{return (el.id === e.target.id)}),quantity:1}}
        }) 
      }
      const timer = setTimeout(() => {
        this.props.cartAdd(this.state.indexAttributes);
       }, 50);
        return ()=> clearTimeout(timer);
  }

    //function to filter category names
filterCategories=()=>{
 const da = this.state.categories.filter(el=>{return el.name === this.props.allCart.catName});
 return da[0]?.products
}

//function to get category name
catName=()=>{
  const catName = this.props.allCart.catName;
   const upper = catName.charAt(0).toUpperCase() + catName.slice(1);
   return upper;
}

    render(){
      const work = this.filterCategories()?.map(el=>{
        return <div key={el.id} className='eachProduct'>
                    <Link to={`${el.id}`} style={{ textDecoration: 'none' }}> 
                      <div className="card-product">
                            <div className="img-div">
                                <img className="card-img" src={el.gallery[0]} alt={el.gallery[0]}></img>
                                {!el.inStock && <div className="overlay--div"><p className="out-stock">OUT OF STOCK</p></div>}
                            </div>
                            <div className={`name-price ${el.inStock === false ? "name-priceColor " : ''}`}>
                                <p className="el-name">{el.brand} {el.name}</p>
                                <p className="currency-p">{el.prices[this.props.allCart.currency].currency.symbol}{el.prices[this.props.allCart.currency].amount} </p>
                            </div>
                      </div>
                    </Link>
                       <button id={el.id} className="button--listPage" onClick={(e)=>this.getId(e)}>
                                <img className="button-emptyCart" id={el.id} src={EmptyCart} alt={EmptyCart}></img>
                        </button>
                </div>
      })

        return(
            <div onClick={e=>{return this.props.miniCartOpen(false)}} 
                  className={this.props.allCart.miniCartIsOpen === true ? `background-color`:''}>
                <h2 className="cat-name">{this.catName()}</h2>
                <div className="products-display">
                   {work}
                </div>
            </div>
            
        )
    }
}


export default ProductsList