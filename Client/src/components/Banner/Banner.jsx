import './Banner.scss';
import React from "react";
import bannerimage from "../../assets/Apple-watch.png";
export default function Banner() {
  return (
    <div className="banner-container">
      <div className="banner">
        <div className="bannerdetails">
          <span>New Apple Watch</span>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
            nesciunt aperiam nobis illo sed? Aperiam id reprehenderit optio, eos
            sed itaque natus voluptatibus sapiente laudantium voluptatum beatae
            non pariatur perspiciatis animi fugiat voluptate est accusantium
            ipsa illo dolorum et harum inventore? Dolorem, optio totam! Quisquam
            enim officia suscipit nemo non.
          </p>
          <button>Read More</button>
        </div>
        <div>
          <img
            className="bannerimage"
            src={bannerimage}
            alt="banner-image"
          />
        </div>
      </div>
    </div>
  );
}
