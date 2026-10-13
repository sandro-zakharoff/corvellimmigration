import { useEffect } from "react";
import { getHeadTags } from "../../../../shared/seo.js";

const managedSelectors = ['link[rel="canonical"]', 'meta[property="og:url"]'];

function findTag(element, attributes) {
    const [key] = ["name", "property", "rel"].filter((name) => attributes[name]);
    return document.head.querySelector(`${element}[${key}="${attributes[key]}"]`);
}

function PageMetadata({ path = null, title, description, type, noindex = false }) {
    useEffect(() => {
        const tags = getHeadTags({ path, title, description, type, noindex }, import.meta.env.SITE_URL);
        document.title = title;

        if (!path) {
            managedSelectors.forEach((selector) => document.head.querySelector(selector)?.remove());
        }

        for (const { element, attributes } of tags) {
            let tag = findTag(element, attributes);

            if (!tag) {
                tag = document.createElement(element);
                document.head.append(tag);
            }

            for (const [name, value] of Object.entries(attributes)) {
                tag.setAttribute(name, value);
            }
        }
    }, [path, title, description, type, noindex]);

    return null;
}

export default PageMetadata;
