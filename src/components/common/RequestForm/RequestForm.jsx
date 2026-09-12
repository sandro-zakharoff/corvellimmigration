import { useEffect, useId, useRef, useState } from "react";
import { FormRequestError } from "../../../services/formRequest";
import StatusMessage from "../StatusMessage/StatusMessage";
import TextBlock from "../TextBlock/TextBlock";
import "./RequestForm.css";

function RequestForm({ content, validate, submit, fieldLimits = {}, className = "", onSuccess, successOnly = false }) {
    const [fieldErrors, setFieldErrors] = useState({});
    const [statusKey, setStatusKey] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formId = useId();
    const formRef = useRef(null);
    const statusRef = useRef(null);
    const controllerRef = useRef(null);
    const mountedRef = useRef(false);
    const submittingRef = useRef(false);
    const showFields = !successOnly || statusKey !== "success";
    const status = content.statusMessages[statusKey] || content.statusMessages.error;

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
            controllerRef.current?.abort();
        };
    }, []);

    useEffect(() => {
        const firstInvalidField = Object.keys(fieldErrors)[0];

        if (statusKey === "warning" && firstInvalidField && !isSubmitting) {
            formRef.current?.elements.namedItem(firstInvalidField)?.focus();
        } else if (statusKey && (statusKey !== "warning" || !firstInvalidField)) {
            statusRef.current?.focus();
        }
    }, [statusKey, fieldErrors, isSubmitting]);

    const showValidation = (errors, form) => {
        const visibleErrors = Object.keys(errors).reduce((result, name) => {
            if (content.validationMessages[name]) {
                result[name] = content.validationMessages[name];
            }

            return result;
        }, {});

        setFieldErrors(visibleErrors);
        setStatusKey("warning");
        form.elements.namedItem(Object.keys(visibleErrors)[0])?.focus();
    };

    const handleFieldChange = (event) => {
        const fieldName = event.target.name;

        if (fieldErrors[fieldName]) {
            setFieldErrors((currentErrors) => {
                const nextErrors = { ...currentErrors };
                delete nextErrors[fieldName];
                return nextErrors;
            });
        }

        if (statusKey) {
            setStatusKey(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (submittingRef.current) {
            return;
        }

        const form = event.currentTarget;
        const validation = validate(Object.fromEntries(new FormData(form)));

        if (!validation.isValid) {
            showValidation(validation.errors, form);
            return;
        }

        const controller = new AbortController();
        controllerRef.current = controller;
        submittingRef.current = true;
        setFieldErrors({});
        setStatusKey(null);
        setIsSubmitting(true);

        try {
            const result = await submit(validation.data, { signal: controller.signal });

            if (!mountedRef.current || controller.signal.aborted) {
                return;
            }

            form.reset();
            setStatusKey("success");
            onSuccess?.(result);
        } catch (error) {
            if (!mountedRef.current || controller.signal.aborted || error.name === "AbortError") {
                return;
            }

            if (error instanceof FormRequestError && error.code === "VALIDATION_ERROR") {
                showValidation(error.fields, form);
            } else if (error instanceof FormRequestError && error.code === "RATE_LIMITED") {
                setStatusKey("rateLimited");
            } else if (error instanceof FormRequestError && ["MAIL_SERVICE_UNAVAILABLE", "QUEUE_UNAVAILABLE", "GUIDE_UNAVAILABLE"].includes(error.code)) {
                setStatusKey("unavailable");
            } else {
                setStatusKey("error");
            }
        } finally {
            submittingRef.current = false;

            if (mountedRef.current && !controller.signal.aborted) {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <form className={["request-form", className].filter(Boolean).join(" ")} noValidate onChange={handleFieldChange} onSubmit={handleSubmit} ref={formRef}>
            {showFields && (
                <>
                    <label className="request-form__verification">
                        <span>Website</span>
                        <input autoComplete="off" disabled={isSubmitting} name="website" tabIndex={-1} type="text" />
                    </label>
                    <div className="request-form__fields">
                        {content.fields.map((field) => {
                            const id = `${formId}-${field.id || field.name}`;
                            const controlClassName = [
                                "request-form__control",
                                field.type === "textarea" ? "request-form__control--textarea" : "",
                                field.type === "select" ? "request-form__control--select" : "",
                                fieldErrors[field.name] ? "request-form__control--invalid" : ""
                            ].filter(Boolean).join(" ");
                            const controlProps = {
                                autoComplete: field.autoComplete,
                                className: controlClassName,
                                disabled: isSubmitting,
                                id,
                                name: field.name,
                                required: field.required
                            };

                            return (
                                <label
                                    className={["request-form__field", field.wide || field.type === "textarea" ? "request-form__field--wide" : ""].filter(Boolean).join(" ")}
                                    htmlFor={id}
                                    key={field.name}
                                >
                                    <span className="request-form__label">
                                        {field.label}
                                        {field.optionalLabel && <span className="request-form__label-optional"> {field.optionalLabel}</span>}
                                    </span>
                                    {field.type === "textarea" ? (
                                        <textarea {...controlProps} maxLength={fieldLimits[field.name]} placeholder={field.placeholder} />
                                    ) : field.type === "select" ? (
                                        <select {...controlProps} defaultValue="">
                                            <option value="">{field.placeholder}</option>
                                            {field.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                                        </select>
                                    ) : (
                                        <input {...controlProps} maxLength={fieldLimits[field.name]} placeholder={field.placeholder} type={field.type} />
                                    )}
                                    {fieldErrors[field.name] && <TextBlock className="request-form__field-error">{fieldErrors[field.name]}</TextBlock>}
                                </label>
                            );
                        })}
                    </div>
                </>
            )}
            {statusKey && (
                <div className={`request-form__status${!showFields ? " request-form__status--only" : ""}`} ref={statusRef} tabIndex={-1}>
                    <StatusMessage {...status} />
                </div>
            )}
            {showFields && (
                <>
                    <button className="request-form__submit" disabled={isSubmitting} type="submit">
                        {isSubmitting ? content.submittingLabel || content.submitLabel : content.submitLabel}
                    </button>
                    {content.note && <TextBlock className="request-form__note">{content.note}</TextBlock>}
                </>
            )}
        </form>
    );
}

export default RequestForm;
