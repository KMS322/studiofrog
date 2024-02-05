import React from "react";
const AboutS3 = () => {
  const importAll = (r) => {
    return r.keys().map(r);
  };

  const images = importAll(
    require.context("../../../public/logos/", false, /\.(png|jpe?g|svg)$/)
  );
  return (
    <div className="about_s3">
      <div className="article_container">
        <p>Our Clients</p>
        <div className="img_box_container">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Client Logo ${index}`} />
          ))}
        </div>
      </div>

      <img src="/images/about_s3_img.jpg" alt="" />
    </div>
  );
};

export default AboutS3;
