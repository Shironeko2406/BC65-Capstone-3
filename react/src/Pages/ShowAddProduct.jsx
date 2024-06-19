import React from "react";
import "../Style/PageProduct.css"

const ShowAddProduct = () => {
  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {/* Card 1 */}
        <div className="col">
          <div className="card h-100">
            <img
              src="path_to_your_image"
              className="card-img-top"
              alt="Adidas Prophere"
            />
            <div className="card-body">
              <h5 className="card-title">Adidas Prophere</h5>
              <p className="card-text">short descript ...</p>
            </div>
            <div className="favorite">
              <img src="path_to_heart_filled_image" alt="favorite" />
            </div>
            <div className="card-footer">
              <button className="btn btn-buy">Buy now</button>
              <span>85$</span>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="col">
          <div className="card h-100">
            <img
              src="path_to_your_image"
              className="card-img-top"
              alt="Adidas Prophere"
            />
            <div className="card-body">
              <h5 className="card-title">Adidas Prophere</h5>
              <p className="card-text">short descript ...</p>
            </div>
            <div className="favorite">
              <img src="path_to_heart_empty_image" alt="favorite" />
            </div>
            <div className="card-footer">
              <button className="btn btn-buy">Buy now</button>
              <span>85$</span>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="col">
          <div className="card h-100">
            <img
              src="path_to_your_image"
              className="card-img-top"
              alt="Adidas Prophere"
            />
            <div className="card-body">
              <h5 className="card-title">Adidas Prophere</h5>
              <p className="card-text">short descript ...</p>
            </div>
            <div className="favorite">
              <img src="path_to_heart_empty_image" alt="favorite" />
            </div>
            <div className="card-footer">
              <button className="btn btn-buy">Buy now</button>
              <span>85$</span>
            </div>
          </div>
        </div>      
      </div>
    </div>
  );
};

export default ShowAddProduct;
