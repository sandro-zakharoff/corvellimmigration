import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Popup.css";

function Popup({ children, onClose, className = "" }) {
    const dialogRef = useRef(null);
    const onCloseRef = useRef(onClose);
    const backdropPress = useRef(false);
    onCloseRef.current = onClose;

    useEffect(() => {
        const dialog = dialogRef.current;
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        const previousPadding = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
        }
        document.body.style.overflow = "hidden";
        dialog.showModal();
        dialog.querySelector("input:not([tabindex='-1'])")?.focus({ preventScroll: true });

        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPadding;
            if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
        };
    }, []);

    function isBackdrop(event) {
        if (event.target !== dialogRef.current) return false;
        const bounds = dialogRef.current.getBoundingClientRect();
        return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    }

    return createPortal(
        <dialog
            className={`popup ${className}`.trim()}
            ref={dialogRef}
            onCancel={(event) => {
                event.preventDefault();
                onCloseRef.current();
            }}
            onPointerDown={(event) => { backdropPress.current = isBackdrop(event); }}
            onClick={(event) => {
                if (backdropPress.current && isBackdrop(event)) onCloseRef.current();
                backdropPress.current = false;
            }}
        >
            <button className="popup__close" type="button" onClick={onClose} title="Close">
                <span className="popup__close-label">Close</span>
            </button>
            {children}
        </dialog>,
        document.body
    );
}

export default Popup;
