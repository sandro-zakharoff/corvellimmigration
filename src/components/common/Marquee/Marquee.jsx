import "./Marquee.css";

function Marquee({ children, className = "", duration = "90s" }) {
    return (
        <div className={["marquee", className].filter(Boolean).join(" ")} style={{ "--marquee-duration": duration }}>
            <div className="marquee__track">
                <div className="marquee__set">{children}</div>
                <div className="marquee__set marquee__set--duplicate">{children}</div>
            </div>
        </div>
    );
}

export default Marquee;
