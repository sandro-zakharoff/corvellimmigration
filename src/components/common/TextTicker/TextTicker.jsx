import Marquee from "../Marquee/Marquee";
import "./TextTicker.css";

function TextTicker({ items, duration, cycles = 1, bordered = false, className = "" }) {
    return (
        <section
            className={[
                "text-ticker",
                bordered ? "text-ticker--bordered" : "",
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <Marquee className="text-ticker__marquee" duration={duration}>
                {Array.from({ length: cycles }, (_, cycleIndex) =>
                    items.map((item) => (
                        <div
                            className="text-ticker__item"
                            style={{ "--text-ticker-item-width": `${item.width}px` }}
                            key={`${cycleIndex}-${item.label}`}
                        >
                            <span className="text-ticker__value">{item.value}</span>
                            <span className="text-ticker__label">{item.label}</span>
                        </div>
                    ))
                )}
            </Marquee>
        </section>
    );
}

export default TextTicker;
