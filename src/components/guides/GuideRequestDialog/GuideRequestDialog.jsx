import { useRef } from "react";
import { guideFieldLimits, validateGuideRequest } from "../../../../shared/guideValidation.js";
import { guideRequestContent } from "../../../content/guideRequest.js";
import { postForm } from "../../../services/formRequest.js";
import Popup from "../../common/Popup/Popup";
import RequestForm from "../../common/RequestForm/RequestForm";
import RichText from "../../common/RichText/RichText";
import "./GuideRequestDialog.css";

function GuideRequestDialog({ guide, onClose }) {
    const submission = useRef(null);

    function validate(values) {
        const signature = JSON.stringify([guide.id, values.fullName, values.jobTitle, values.company, values.workEmail]);
        if (submission.current?.signature !== signature) {
            submission.current = { signature, id: crypto.randomUUID() };
        }
        return validateGuideRequest({ ...values, guideId: guide.id, requestId: submission.current.id });
    }

    async function submit(data, options) {
        try {
            return await postForm("/api/guides", data, options);
        } catch (error) {
            if (["REQUEST_CONFLICT", "MAIL_DELIVERY_FAILED"].includes(error.code)) submission.current = null;
            throw error;
        }
    }

    return (
        <Popup className="guide-request" onClose={onClose}>
            <span className="guide-request__eyebrow">{guideRequestContent.eyebrow}</span>
            <h2 className="guide-request__title"><RichText value={guide.title} links={false} /></h2>
            <div className="guide-request__description"><p>{guideRequestContent.description}</p></div>
            <RequestForm
                content={guideRequestContent}
                validate={validate}
                submit={submit}
                fieldLimits={guideFieldLimits}
                successOnly
            />
        </Popup>
    );
}

export default GuideRequestDialog;
