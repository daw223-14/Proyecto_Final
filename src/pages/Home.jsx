import React from 'react';
import HeroBanner from "../components/HeroBanner";
import DiscoverSection from "../components/DiscoverSection";
import ProductsSection from "../components/ProductsSection";
import SubscribeSection from '../components/SubscribeSection';

function Home(){

    return (
        <main className="full-block">
            <HeroBanner />
            <DiscoverSection />
            <ProductsSection sectionTitle="Ofertas Especiales" sectionPhrase="Ofertas y descuentos exclusivos" filter="sale_percentage" id="on-sale"/>
            <ProductsSection sectionTitle="Top Ventas" sectionPhrase="Zapatillas más vendidas en 2024" filter="cantidadVendido" id="popular_items"/>
            <ProductsSection sectionTitle="Últimos Lanzamientos" sectionPhrase="Últimos lanzamientos en 2024" filter="fechaAñadido" id="recent_releases"/>
            <SubscribeSection />
            
        </main>
    )
}

export default Home;