import heroImage from "../../../assets/images/hero-employment-immigration.webp";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="hero__inner container">
                <div className="hero__media">
                    <img
                        className="hero__image"
                        src={heroImage}
                        alt=""
                        fetchPriority="high"
                    />
                </div>
                <div className="hero__content">
                    <TextBlock className="hero__eyebrow">Employment-based immigration practice</TextBlock>
                    <h1 className="hero__title">
                        <span>AI-powered</span>{"\n"}
                        <span className="hero__title-accent">employment</span>{"\n"}
                        <span>immigration</span>
                    </h1>
                </div>
            </div>
        </section>
    );
}

export default Hero;
