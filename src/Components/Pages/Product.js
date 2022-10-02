import React from "react";
/* import { getData } from "../data/fetchData"; */
import data from "../data/data";
import { useParams } from "react-router-dom";
import "./Product.css"
import parse from 'html-react-parser'


export function withRouter(Children){
    return(props)=>{
       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
  }
  
class Product extends React.Component{
    state = {
             categories:[],
             imgIndex:0,
             indexAttributes:{
                cart:[],
                colorIndex:0,
                capacityIndex:0,
                sizeIndex:0,
                withUsbIndex:0,
                withTouchIdIndex:0,
                quantity:0
             },
            }

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
                });
    } */

    componentDidMount(){
      this.setState(data.data);
    }

    getId=()=>{
        if(this.state.categories.length === 0){
            return [];
        } else {
          return this.state.categories[0]?.products.filter(el=>{return (el.id === this.props.match.params.id)});
        }
    }

    getImgId=(event)=>{
            this.setState({imgIndex:event.target.id});
    }

    buttons=()=>{
      this.setState(prev=>({indexAttributes:
        {...prev.indexAttributes,cart:this.getId(),quantity:1}
      }));
        const timer = setTimeout(() => {
           this.props.cartAdd(this.state.indexAttributes);
          }, 50);
           return ()=> clearTimeout(timer);
    }  

    
    indexAtt=(e)=>{
      if(e.target.dataset.value === "Color"){
          this.setState(state=>({indexAttributes:{...state.indexAttributes,colorIndex:parseInt(e.target.id)}}));
      }else if(e.target.dataset.value === "Capacity"){
          this.setState(state=>({indexAttributes:{...state.indexAttributes,capacityIndex:parseInt(e.target.id)}}));
      }else if(e.target.dataset.value === "With USB 3 ports"){
        this.setState(state=>({indexAttributes:{...state.indexAttributes,withUsbIndex:parseInt(e.target.id)}}));
      }else if(e.target.dataset.value === "Touch ID in keyboard"){
        this.setState(state=>({indexAttributes:{...state.indexAttributes,withTouchIdIndex:parseInt(e.target.id)}}));
      }else if(e.target.dataset.value === "Size"){
        this.setState(state=>({indexAttributes:{...state.indexAttributes,sizeIndex:parseInt(e.target.id)}}));
      };
    };
 
    getElName=(el)=>{
      if(el==="Color"){
        return this.state.indexAttributes.colorIndex;
      }else if(el==="Capacity"){
        return this.state.indexAttributes.capacityIndex;
      }else if(el==="With USB 3 ports"){
        return this.state.indexAttributes.withUsbIndex;
      }else if(el==="Touch ID in keyboard"){
        return this.state.indexAttributes.withTouchIdIndex;
      }else if(el==="Size"){
        return this.state.indexAttributes.sizeIndex;
      }
    }
    
    render(){
        const objMap = this.getId().map((el, i)=>{
            return <div className="div-product" key={i}>
                        {this.props.allCart.windowSize > 764 && <div className="all--img">{el.gallery.map((el,i)=>{return <div key={i} id={i} onClick={(e)=>this.getImgId(e)} 
                             className="min-img"><img className="img--img" id={i} src={el} alt={el}></img></div> })}
                        </div>}
                        <div className="single-img">
                          <img className="img--img" src={el.gallery[this.state.imgIndex]} alt={el.gallery}></img>
                        </div> 
                        {this.props.allCart.windowSize <= 764 && <div className="all--img">{el.gallery.map((el,i)=>{return <div key={i} id={i} onClick={(e)=>this.getImgId(e)} 
                             className="min-img"><img className="img--img" id={i} src={el} alt={el}></img></div> })}
                        </div>}
                        <div className="detail--div">
                               <p className="brand-p">{el.brand}</p>
                               <p className="name-p">{el.name}</p>
                               <div className="all-attributes">{el.attributes.map((element, index)=>{
                                    return <div key={element.id}>
                                                <div className="id-name" id={index} key={element.id}>{element.name}:</div>
                                                <div className="elements--div">
                                                  {element.type === 'swatch' ? element.items.map((el, i)=>{return <div data-value={element.id} id={i} onClick={e=>this.indexAtt(e)} key={el.value} 
                                                                                                                        className={`color--div ${this.getElName(element.name) === i ? `color--divBorder`:''} ${el.value === '#FFFFFF' ? 'color--diva': ''}`} 
                                                                                                                        style={{backgroundColor: `${el.value}`}}></div>}) : 
                                                    element.items.map((el, i)=>{return <div data-value={element.name} id={i} onClick={e=>this.indexAtt(e)} key={el.id} className={`items--value ${this.getElName(element.name) === i ? `items--valueDiv`:''}`}>{el.value}</div> })}
                                                 </div>
                                           </div>
                                    })}
                                </div>
                                <div className="price--div">
                                    <p className="price--name">PRICE:</p>
                                    <div className="total--price">{el.prices[this.props.allCart.currency]?.currency.symbol}{el.prices[this.props.allCart.currency]?.amount}</div>
                                </div>
                                <div className="button--div">
                                    <button onClick={e=>this.buttons(e)} className="button--add">ADD TO CART</button>
                                </div>
                                  <div className="text--div">
                                    {parse(el.description)}
                                  </div>
                        </div>
                   </div>
        })

        return(
                <div className={`all--Product ${this.props.allCart.miniCartIsOpen === true ? 'background-colorProduct' : ''}`} onClick={()=>this.props.miniCartOpen(false)}>
                  {objMap}
                </div>
           
        )
    }
}

export default withRouter(Product)