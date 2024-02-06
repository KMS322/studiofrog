import React from "react";
const AboutS3 = () => {
  const importAll = (r) => {
    return r.keys().map(r);
  };

  const images = importAll(
    require.context("../../../public/logos/", false, /\.(png|jpe?g|svg)$/)
  );
  const imagesLength = images.length;
  const midpoint = Math.ceil(imagesLength / 2);

  const images1 = images.slice(0, midpoint);
  const images2 = images.slice(midpoint);
  return (
    <div className="about_s3">
      <div className="article_container">
        <p>Our Clients</p>
        <div id="pc" className="img_box_container">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Client Logo ${index}`} />
          ))}
        </div>
        <div id="mobile" className="img_box_container1">
          {images1.map((image, index) => (
            <img key={index} src={image} alt={`Client Logo ${index}`} />
          ))}
        </div>
        <div id="mobile" className="img_box_container1">
          {images2.map((image, index) => (
            <img key={index} src={image} alt={`Client Logo ${index}`} />
          ))}
        </div>
      </div>

      <img id="pc" src="/images/about_s3_img.jpg" alt="" />
      <img id="mobile" src="/images/about_s3_img_mobile.jpg" alt="" />
    </div>
  );
};

export default AboutS3;
