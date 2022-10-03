import React from "react";
import Product from "./Product";
import { Routes, Route } from "react-router-dom";
import ProductsList from "./ProductsList";
import Cart from "./Cart";
import ScrollToTop from "../ScrollToTop";

export default class Home extends React.Component{
    
    render(){
        return(
            <div>
                <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<ProductsList allCart={this.props.allCart}
                                                               miniCartOpen={this.props.miniCartOpen}
                                                               cartAdd={this.props.cartAdd} 
                        />} ></Route>
                        <Route path="/:id/" element={<Product allCart={this.props.allCart}
                                                              cartAdd={this.props.cartAdd} 
                                                              miniCartOpen={this.props.miniCartOpen}
                        />} ></Route>
                        <Route path="/cart/" element={<Cart allCart={this.props.allCart}
                                                            addRemoveCart={this.props.addRemoveCart}
                                                            miniCartOpen={this.props.miniCartOpen}
                                                            /> 
                        }></Route>
                     </Routes>
            </div>
            
        )
    }
}