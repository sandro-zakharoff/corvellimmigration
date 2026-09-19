import { useEffect } from "react";

function PageMetadata({ title, description }) {
    useEffect(() => {
        const previousTitle = document.title;
        const descriptionElement = document.querySelector('meta[name="description"]');
        const previousDescription = descriptionElement?.getAttribute("content");
        document.title = title;
        if (descriptionElement) descriptionElement.setAttribute("content", description);

        return () => {
            document.title = previousTitle;
            if (descriptionElement) descriptionElement.setAttribute("content", previousDescription ?? "");
        };
    }, [title, description]);

    return null;
}

export default PageMetadata;
