import "./ServiceNote.css";

function ServiceNote({ children, inverse = false }) {
    return <div className={`service-note${inverse ? " service-note--inverse" : ""}`}>{children}</div>;
}

export default ServiceNote;
