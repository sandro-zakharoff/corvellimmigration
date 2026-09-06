import TextBlock from "../TextBlock/TextBlock";
import "./StatusMessage.css";

function StatusMessage({ label, message, type }) {
    if (!message) {
        return null;
    }

    return (
        <div className={`status-message status-message--${type}`}>
            <TextBlock className="status-message__label">{label}</TextBlock>
            <TextBlock className="status-message__text">{message}</TextBlock>
        </div>
    );
}

export default StatusMessage;
