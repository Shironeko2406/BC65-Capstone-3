import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrderActionAsync } from "../Redux/Reducers/OderReducer";

const ModalConfirmOrder = () => {
  const { cart } = useSelector((state) => state.CartReducer);
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        console.log(response.data);
        setCities(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setSelectedWard("");

    const selectedCity = cities.find((city) => city.Id === cityId);
    const cityName = selectedCity ? selectedCity.Name : "";

    formOrder.setFieldValue("city", cityName);
    formOrder.setFieldValue("district", "");
    formOrder.setFieldValue("ward", "");

    setDistricts(selectedCity ? selectedCity.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard("");

    const selectedDistrict = districts.find(
      (district) => district.Id === districtId
    );
    const districtName = selectedDistrict ? selectedDistrict.Name : "";

    formOrder.setFieldValue("district", districtName);
    formOrder.setFieldValue("ward", "");

    setWards(selectedDistrict ? selectedDistrict.Wards : []);
  };

  const handleWardChange = (e) => {
    const wardId = e.target.value;
    setSelectedWard(wardId);

    const selectedWard = wards.find((ward) => ward.Id === wardId);
    const wardName = selectedWard ? selectedWard.Name : "";

    formOrder.setFieldValue("ward", wardName);
  };

  const handleSubmit = () => {
    formOrder.handleSubmit(); // Kích hoạt submit của formik
  };

  const formOrder = useFormik({
    initialValues: {
      email: "",
      city: "",
      district: "",
      ward: "",
      address: "",
    },
    onSubmit: (values) => {
      const orderDetails = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const orderData = {
        ...values,
        orderDetail: orderDetails,
      };

      console.log(orderData);
      const action = CreateOrderActionAsync(orderData);
      dispatch(action);
    },
  });

  return (
    <div>
      {/* Modal trigger button */}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-bs-toggle="modal"
        data-bs-target="#modalOrder"
        style={{ display: "none" }}
      >
        Launch
      </button>
      <div
        className="modal fade"
        id="modalOrder"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered "
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Form Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={formOrder.handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={formOrder.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="city">City</label>
                  <select
                    className="form-control"
                    id="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.Id} value={city.Id}>
                        {city.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="district">District</label>
                  <select
                    className="form-control"
                    id="district"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedCity}
                  >
                    <option value="">Select a district</option>
                    {districts.map((district) => (
                      <option key={district.Id} value={district.Id}>
                        {district.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="ward">Ward</label>
                  <select
                    className="form-control"
                    id="ward"
                    value={selectedWard}
                    onChange={handleWardChange}
                    disabled={!selectedDistrict}
                  >
                    <option value="">Select a ward</option>
                    {wards.map((ward) => (
                      <option key={ward.Id} value={ward.Id}>
                        {ward.Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    onChange={formOrder.handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Place to the bottom of scripts */}
    </div>
  );
};

export default ModalConfirmOrder;
