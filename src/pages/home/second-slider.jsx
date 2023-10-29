/* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import { instance } from "../../services/axios/instance";

import CaraouselItem from "./caraousel-item";

export default function SecondSlider(props) {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   instance
  //     .get(`?skip=${props.skip}&limit=${props.limit}`)
  //     .then((res) => {
  //       console.log(res.data.products);
  //       setProducts(res.data.products);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <div className="container-fluid px-4 py-2">
        <div
          id="productSlider"
          className="carousel slide position-relative bg-white mx-2">
          <h5 className="px-4 pt-3">
            <span className="pe-3 fs-3">{props.title1}</span>
            <span>
              <a href="#" className="text-decoration-none fs-5">
                {props.title2}
              </a>
            </span>
          </h5>

          <div className="carousel-inner">
          <div className="carousel-item active">
          <CaraouselItem
          skip={props.skip1}
          limit={props.limit1}
            />
          </div>

          <div className="carousel-item">
          <CaraouselItem
           skip={props.skip2}
           limit={props.limit2}
            />
          </div>
          <div className="carousel-item">
          <CaraouselItem
          skip={props.skip3}
          limit={props.limit3}
            />
          </div>
            
          </div>


          <button
            className="carousel-control-prev position-absolute top-50 start-0 translate-middle btn-slider ms-3"
            type="button"
            data-bs-target="#productSlider"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon slider2-PrevIcon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next position-absolute top-50 end-0 translate-middle-y btn-slider"
            type="button"
            data-bs-target="#productSlider"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon slider2-NextIcon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}