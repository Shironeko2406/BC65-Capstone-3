import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProductByIdActionAsync } from "../Redux/Reducers/ProductReducer";

const ShowProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const { detailProductById } = useSelector((state) => state.ProductReducer);
  console.log(detailProductById);

  const getDetailProductById = async () => {
    const actionAsync = GetProductByIdActionAsync(id);
    dispatch(actionAsync);
  };

  useEffect(() => {
    getDetailProductById();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={detailProductById?.image || "default-image.jpg"}
            className="img-fluid"
            alt="Product"
          />
        </div>
        <div className="col-md-6">
          <h2>{detailProductById?.name}</h2>
          <p>{detailProductById?.description}</p>
          <h5>Available size</h5>
          <div>
            {detailProductById?.size.map((size, index) => (
              <button key={index} className="btn btn-outline-secondary me-2">
                {size}
              </button>
            ))}
          </div>
          <h4 className="mt-3">${detailProductById?.price}</h4>
          <div className="d-flex align-items-center">
            <input
              type="number"
              className="form-control w-25 me-2"
              defaultValue="1"
            />
            <button className="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3>Related Products</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {detailProductById?.relatedProducts.map((product, idx) => (
            <div className="col" key={idx}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                <div className="card-footer">
                  <NavLink
                    className="btn btn-warning"
                    to={`/product-detail/${product.id}`}
                  >
                    View detail
                  </NavLink>
                  <span className="ms-2">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProductDetail;