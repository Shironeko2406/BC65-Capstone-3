import React, { useEffect } from "react";
import "../Style/PageProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { GetProductListActionAsync } from "../Redux/Reducers/ProductReducer";
import { NavLink, useOutletContext } from "react-router-dom";

const ShowAllProduct = () => {
  const { productList } = useSelector((state) => state.ProductReducer);
  console.log(productList);
  const dispatch = useDispatch();

  const { searchTerm, filterOrder } = useOutletContext();
  useEffect(() => {
    const actionAsync = GetProductListActionAsync();
    dispatch(actionAsync);
  }, []);

  const filteredProducts = productList
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterOrder === "up") {
        return a.price - b.price;
      } else if (filterOrder === "down") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.shortDescription}</p>
              </div>
              <div className="favorite">
                <img src="path_to_heart_filled_image" alt="favorite" />
              </div>
              <div className="card-footer">
                <NavLink
                  className="btn btn-buy"
                  to={`/product-detail/${product.id}`}
                >
                  View detail
                </NavLink>
                <span>{product.price}$</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAllProduct;
