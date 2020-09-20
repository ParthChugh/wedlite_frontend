import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

export default (
  <Switch>
    <Route path="/cart"/> 
    <Route path="/shop/products"/>
    <Route path="/shop/:id"/>
    <Route path="/ecommerce/payments/confirm"/>
    <Route path="/shop" />
    <Route path="/blog" />
    <Route path="/terms-and-conditions"/>
    <Route path="/my-venues" />
    <Route path="/about-us" />
    <Route path="/vendor-registration" />
    <Route path="/place-order" />
    <Route path="/login" />
    <Route path="/sign-up" />
    <Route path="/careers" />
    <Route path="/contact-us" />
    <Route path="/venue/place/:placeId/edit" />
    <Route path="/venue/place/:placeId" />
    <Route path="/venue-by-group/location/:cityId/group/:groupName" />
    <Route path="/venue/category/:categoryId/city/:cityId" />
    <Route exact path="/" />
  </Switch>
);

