import RichText from "../../common/RichText/RichText";
import "./ServiceNote.css";

function ServiceNote({ children, inverse = false }) {
    return <div className={`service-note${inverse ? " service-note--inverse" : ""}`}><RichText value={children} /></div>;
}

export default ServiceNote;
