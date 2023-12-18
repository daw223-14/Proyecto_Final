import React from "react";
import "../styles/DiscoverSection.css"
import DiscoverBanner from "./DiscoverCategoryBanner";

function DiscoverSection(){
    return (
        <section className="category full-block" id="discover-store">
            <div className="container">
                <div className="category-content">
                    <div className="category-content-left-side">
                        <div className="category-content-left-side-fashion">
                            <DiscoverBanner name="REBAJAS" link="on-sale"/>
                        </div>
                        <div className="category-content-left-side-best-sale big-category">
                            <DiscoverBanner name="POPULAR" link="popular_items"/>
                         </div>
                    </div>
                    <div className="category-content-right-side">
                        <div className="category-content-right-side-accessories big-category">
                                <DiscoverBanner name="ULTIMOS LANZAMIENTOS" link="recent_releases"/>
                        </div>
                        <div className="category-content-right-side-others">
                                <DiscoverBanner name="ACCESORIOS" To="/accessories"/>
                        </div>      
                    </div>
            </div>
        </div>
      </section>
    )
}

export default DiscoverSection;
