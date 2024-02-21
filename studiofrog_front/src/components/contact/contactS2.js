import React, { useEffect, useRef } from "react";
const ContactS2 = () => {
  const tagRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowWidth = window.innerWidth;
      let triggerPosition;

      if (windowWidth <= 500) {
        triggerPosition = (90 * windowWidth) / 100;
      } else {
        triggerPosition = (10 * windowWidth) / 100;
      }

      if (
        scrollPosition >= triggerPosition &&
        tagRef.current &&
        tagRef.current
      ) {
        tagRef.current.classList.add("animate1");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="contact_s2" ref={tagRef}>
        <p>찾아오시는 길</p>
        <p>대구광역시 동구 경안로 722 3층 STUDIOFROG</p>
        <div className="text_box_container">
          <div className="text_box">
            <p>PHONE</p>
            <p>010-7747-5367</p>
          </div>
          <div className="text_box">
            <p>FAX</p>
            <p>0508-910-5367</p>
          </div>
          <div className="text_box">
            <p>EMAIL</p>
            <p>studiofrogg@gmail.com</p>
          </div>
        </div>
        <img id="pc" src="/images/map.jpg" alt="" />
      </div>
      <img className="mobile_map" id="mobile" src="/images/map.jpg" alt="" />
    </>
  );
};

export default ContactS2;
