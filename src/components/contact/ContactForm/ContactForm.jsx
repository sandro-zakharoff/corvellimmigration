import { useState } from "react";
import { contactFieldLimits, validateContactForm } from "../../../../shared/contactValidation";
import { ContactRequestError, sendContactForm } from "../../../services/contactForm";
import StatusMessage from "../../common/StatusMessage/StatusMessage";
import TextBlock from "../../common/TextBlock/TextBlock";
import "./ContactForm.css";

function ContactForm({ content }) {
    const [fieldErrors, setFieldErrors] = useState({});
    const [statusKey, setStatusKey] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getVisibleErrors = (errors) =>
        Object.keys(errors).reduce((visibleErrors, name) => {
            if (content.validationMessages[name]) {
                visibleErrors[name] = content.validationMessages[name];
            }

            return visibleErrors;
        }, {});

    const handleFieldChange = (event) => {
        const fieldName = event.target.name;

        if (fieldErrors[fieldName]) {
            setFieldErrors((currentErrors) => {
                const nextErrors = { ...currentErrors };
                delete nextErrors[fieldName];
                return nextErrors;
            });
        }

        if (statusKey === "warning" || statusKey === "success") {
            setStatusKey(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = Object.fromEntries(new FormData(form));
        const validation = validateContactForm(formData);

        if (!validation.isValid) {
            const visibleErrors = getVisibleErrors(validation.errors);
            const firstInvalidField = Object.keys(visibleErrors)[0];

            setFieldErrors(visibleErrors);
            setStatusKey("warning");
            form.elements.namedItem(firstInvalidField)?.focus();
            return;
        }

        setFieldErrors({});
        setStatusKey(null);
        setIsSubmitting(true);

        try {
            await sendContactForm(validation.data);
            form.reset();
            setStatusKey("success");
        } catch (error) {
            if (error instanceof ContactRequestError && error.code === "VALIDATION_ERROR") {
                const visibleErrors = getVisibleErrors(error.fields);
                const firstInvalidField = Object.keys(visibleErrors)[0];

                setFieldErrors(visibleErrors);
                setStatusKey("warning");
                form.elements.namedItem(firstInvalidField)?.focus();
            } else if (error instanceof ContactRequestError && error.code === "RATE_LIMITED") {
                setStatusKey("rateLimited");
            } else {
                setStatusKey("error");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="contact-form" noValidate onChange={handleFieldChange} onSubmit={handleSubmit}>
            <label className="contact-form__verification">
                <span>Website</span>
                <input autoComplete="off" name="website" tabIndex={-1} type="text" />
            </label>
            <div className="contact-form__fields">
                {content.fields.map((field) => {
                    const controlClassName = [
                        "contact-form__control",
                        field.type === "textarea" ? "contact-form__control--textarea" : "",
                        field.type === "select" ? "contact-form__control--select" : "",
                        fieldErrors[field.name] ? "contact-form__control--invalid" : ""
                    ]
                        .filter(Boolean)
                        .join(" ");

                    return (
                        <label
                            className={[
                                "contact-form__field",
                                field.type === "textarea" ? "contact-form__field--wide" : ""
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            htmlFor={field.id}
                            key={field.id}
                        >
                            <span className="contact-form__label">
                                {field.label}
                                {field.optionalLabel && (
                                    <span className="contact-form__label-optional">
                                        {" "}
                                        {field.optionalLabel}
                                    </span>
                                )}
                            </span>
                            {field.type === "textarea" ? (
                                <textarea
                                    className={controlClassName}
                                    id={field.id}
                                    maxLength={contactFieldLimits[field.name]}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                />
                            ) : field.type === "select" ? (
                                <select
                                    className={controlClassName}
                                    defaultValue=""
                                    id={field.id}
                                    name={field.name}
                                >
                                    <option value="">{field.placeholder}</option>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    className={controlClassName}
                                    id={field.id}
                                    maxLength={contactFieldLimits[field.name]}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                />
                            )}
                            {fieldErrors[field.name] && (
                                <TextBlock className="contact-form__field-error">
                                    {fieldErrors[field.name]}
                                </TextBlock>
                            )}
                        </label>
                    );
                })}
            </div>
            {statusKey && (
                <div className="contact-form__status">
                    <StatusMessage {...content.statusMessages[statusKey]} />
                </div>
            )}
            <button className="contact-form__submit" disabled={isSubmitting} type="submit">
                {content.submitLabel}
            </button>
            <TextBlock className="contact-form__note">{content.note}</TextBlock>
        </form>
    );
}

export default ContactForm;
