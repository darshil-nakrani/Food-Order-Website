import React, { useEffect, useState } from "react";
import p1 from "../../assets/p1.webp";
import p2 from "../../assets/p2.webp";
import p3 from "../../assets/p3.webp";
import './Prodetail.css';

function Prodetail() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="Pmain-prodetail">
      <div className="Pcontainer">
        <div className="Prow Pheading">
          {/* Burger Column */}
          <div className="Pcolumn animate-up">
            <div className="Pimage-container floating">
              <img src={p2} alt="beef classic" />
            </div>
            <div className="text-content">
              <div className="Pprice">
                From <span className="Pcurrency">₹</span><span className="Pprice-value">17</span>
              </div>
              <h2 className="Ptitle">beef classic</h2>
              <h3 className="Psubtitle">burgers</h3>
              <p className="Pdescription">
                Two premium flame-grilled patties, whole-grain artisan bun, and our signature garden-fresh lettuce.
              </p>
              <div className="Padd-button">
                <a href="#food-display"><span>Explore More</span></a>
              </div>
            </div>
          </div>

          {/* Pasta Column */}
          <div className="Pcolumn animate-up delay-1">
            <div className="Pimage-container floating">
              <img src={p1} alt="The best pasta" />
            </div>
            <div className="text-content">
              <div className="Pprice">
                From <span className="Pcurrency">₹</span><span className="Pprice-value">120</span>
              </div>
              <h2 className="Ptitle">The best pasta</h2>
              <h3 className="Psubtitle">Italian</h3>
              <p className="Pdescription">
                Hand-crafted pasta tossed in rich, slow-cooked savory sauce and aged parmesan.
              </p>
              <div className="Padd-button">
                <a href="#food-display"><span>Explore More</span></a>
              </div>
            </div>
          </div>

          {/* Soup Column */}
          <div className="Pcolumn animate-up delay-2">
            <div className="Pimage-container floating">
              <img src={p3} alt="Season soup" />
            </div>
            <div className="text-content">
              <div className="Pprice">
                From <span className="Pcurrency">₹</span><span className="Pprice-value">135</span>
              </div>
              <h2 className="Ptitle">Season soup</h2>
              <h3 className="Psubtitle">Fresh</h3>
              <p className="Pdescription">
                A warm, wholesome blend of farm-harvested seasonal vegetables and aromatic herbs.
              </p>
              <div className="Padd-button">
                <a href="#food-display"><span>Explore More</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prodetail;
