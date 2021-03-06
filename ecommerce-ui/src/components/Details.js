import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { ButtonContainer } from "./Button";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            title,
            houseType,
            image,
            location:{city},
            location:{country},
            payment:{cost},
            payment:{description},
            host:{name},
            host:{isSuperhost},
            rating:{stars},
            rating:{reviews},
            inCart
          } = value.detailProduct;

          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* end of title */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={image} className="img-fluid" alt="" />
                </div>
                {/* prdoduct info */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h1>{title}</h1>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    <span className="text-uppercase">{houseType}</span>
                  </h4>
                  <p className="text-muted lead">{city}, {country}</p>
                  <h4 className="text-blue">
                    <strong>
                      price : <span>$</span>
                      {cost} 
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                  {description}<br />
                  {isSuperhost ? '🏆 Superhost' : 'Host'} - {name} <br />
                  {'⭐️'.repeat(stars)}<br /> 
                  {reviews} reviews 
                  </p>
                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => {
                        value.addToCart(id);
                        value.openModal(id);
                      }}
                    >
                      {inCart ? "in cart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

Details.propTypes = {
  product:PropTypes.shape({
    title:PropTypes.string,
    houseType:PropTypes.string,
    image:PropTypes.string,
    city:PropTypes.string,
    country:PropTypes.string,
    cost:PropTypes.number,
    name:PropTypes.string,
    inCart:PropTypes.bool,
    isSuperhost:PropTypes.bool,
    stars:PropTypes.number,
    reviews:PropTypes.number
  }).isRequired
}
