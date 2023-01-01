import React from "react";
import "./Item.css";
import ProdItem from "./ProdItem";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My first Book",
    description: "My first book description",
  },
  {
    id: "p2",
    price: 5,
    title: "My second Book",
    description: "My second book description",
  },
];

const Item = () => {
  return (
    <>
      <div className="container-center container-col">
        <p className="product-title">All your favourite products!!</p>
        {DUMMY_PRODUCTS.map((product) => (
          <ProdItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </>
  );
};

export default Item;
