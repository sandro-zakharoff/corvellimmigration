import { blockDefinitions } from "./blockDefinitions.js";

function fail(path, message) {
    throw new Error(`Ошибка контента: ${path} — ${message}`);
}

function requireObject(value, path) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        fail(path, "ожидается объект в фигурных скобках");
    }
}

function requireFields(value, fields, path) {
    for (const field of fields) {
        if (value[field] === undefined || value[field] === null || (field !== "alt" && value[field] === "")) {
            fail(`${path}.${field}`, "заполните обязательное поле");
        }
    }
}

function validateArray(value, path, validateItem) {
    if (!Array.isArray(value)) {
        fail(path, "ожидается список в квадратных скобках");
    }

    value.forEach((item, index) => validateItem(item, `${path}[${index}]`));
}

function validateRecords(value, path, fields = [], validateItem) {
    validateArray(value, path, (item, location) => {
        requireObject(item, location);
        requireFields(item, fields, location);
        validateItem?.(item, location);
    });
}

function validateRichText(value, path) {
    const isText = (part) => typeof part === "string" || (typeof part === "number" && Number.isFinite(part));

    if (isText(value)) return;

    function validatePart(part, location) {
        if (isText(part)) return;
        requireObject(part, location);

        if (!isText(part.text)) {
            fail(`${location}.text`, "укажите текст или число для этой части текста");
        }

        for (const field of ["accent", "strong", "italic"]) {
            if (part[field] !== undefined && typeof part[field] !== "boolean") {
                fail(`${location}.${field}`, "используйте true или false");
            }
        }
    }

    if (Array.isArray(value)) {
        validateArray(value, path, validatePart);
    } else {
        validatePart(value, path);
    }
}

export function isContentLink(value) {
    return typeof value === "string" && /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(value) && !/[\u0000-\u0020\\]/.test(value);
}

function validateLink(value, path, labelField = "label") {
    requireObject(value, path);
    requireFields(value, ["path", labelField], path);

    if (!isContentLink(value.path)) {
        fail(`${path}.path`, "укажите ссылку /page, #anchor, https://, mailto: или tel: без пробелов");
    }

    validateRichText(value[labelField], `${path}.${labelField}`);
}

const richTextFields = new Set([
    "title", "description", "eyebrow", "label", "text", "quote", "author", "byline",
    "category", "caption", "value", "code", "tag", "position", "name", "clientsLabel", "date"
]);

function validateValues(value, path) {
    if (Array.isArray(value)) {
        value.forEach((item, index) => validateValues(item, `${path}[${index}]`));
        return;
    }

    if (!value || typeof value !== "object") {
        return;
    }

    for (const [key, field] of Object.entries(value)) {
        if (key === "blocks") {
            continue;
        }

        if (key === "path" && !isContentLink(field)) {
            fail(`${path}.path`, "укажите ссылку /page, #anchor, https://, mailto: или tel: без пробелов");
        }

        if (field !== undefined && field !== null) {
            if (richTextFields.has(key)) {
                validateRichText(field, `${path}.${key}`);
            }

            if (["link", "footerLink"].includes(key)) {
                validateLink(field, `${path}.${key}`);
            }

            if (["image", "src", "alt", "imageAlt"].includes(key) && typeof field !== "string") {
                fail(`${path}.${key}`, "ожидается строка");
            }
        }

        validateValues(field, `${path}.${key}`);
    }
}

function validateBlockData(block, definition, path) {
    const textArrays = ["paragraphs", "credentials", "columns"];

    for (const field of definition.arrays || []) {
        if (field === "rows") continue;

        if (textArrays.includes(field)) {
            validateArray(block[field], `${path}.${field}`, validateRichText);
        } else {
            validateRecords(block[field], `${path}.${field}`);
        }
    }

    for (const field of ["titleParts", "descriptionParts"]) {
        if (block[field] !== undefined && block[field] !== null) {
            validateRecords(block[field], `${path}.${field}`, ["text"], (part, location) => {
                if (typeof part.text !== "string" && !(typeof part.text === "number" && Number.isFinite(part.text))) {
                    fail(`${location}.text`, "укажите текст или число для этой части текста");
                }
            });
        }
    }

    const optionalTextArrays = {
        "industry-hero": "tags",
        "industry-cost": "points",
        "insight-header": "meta"
    };
    const optionalArray = optionalTextArrays[block.type];

    if (optionalArray && block[optionalArray] !== undefined && block[optionalArray] !== null) {
        validateArray(block[optionalArray], `${path}.${optionalArray}`, validateRichText);
    }

    if (block.note !== undefined && block.note !== null && block.type !== "careers-roles") {
        validateRichText(block.note, `${path}.note`);
    }

    for (const field of ["links", "guides"]) {
        if (block[field] !== undefined) {
            validateArray(block[field], `${path}.${field}`, (link, location) => validateLink(link, location, field === "guides" ? "title" : "label"));
        }
    }

    if (["industry-directory", "industries-showcase", "industry-related"].includes(block.type)) {
        const field = block.type === "industry-related" ? "items" : "industries";
        validateRecords(block[field], `${path}.${field}`, ["title", "path"], (industry, location) => {
            if (block.type !== "industries-showcase") {
                const tags = block.type === "industry-related" ? "tags" : "visaTypes";
                validateArray(industry[tags], `${location}.${tags}`, validateRichText);
            }
        });
    }

    if (block.type === "industry-roles") {
        validateRecords(block.groups, `${path}.groups`, ["title"], (group, location) => {
            validateRecords(group.items, `${location}.items`, ["title"]);
        });
    }

    if (block.type === "industry-process") {
        validateRecords(block.tracks, `${path}.tracks`, ["title"], (track, location) => {
            validateRecords(track.steps, `${location}.steps`, ["title"]);
        });
    }

    if (["team-profiles", "team-cards", "people-preview"].includes(block.type)) {
        validateRecords(block.members, `${path}.members`, ["name"], (person, location) => {
            if (block.type === "team-profiles") {
                validateArray(person.biography, `${location}.biography`, validateRichText);
                validateRecords(person.facts, `${location}.facts`, ["label", "value"]);
            }

            if (block.type === "people-preview") {
                requireFields(person, ["slug"], location);
            }
        });
    }

    if (["text-ticker", "insight-stats", "firm-today"].includes(block.type)) {
        const field = block.type === "firm-today" ? "metrics" : "items";
        validateRecords(block[field], `${path}.${field}`, ["value", "label"]);
    }

    if (["list", "timeline"].includes(block.type)) {
        validateRecords(block.items, `${path}.items`, block.type === "timeline" ? ["date", "text"] : ["text"]);
    }

    if (["services-overview", "why-corvell", "compliance", "industry-routes", "industry-execution", "industry-benefits", "insights-archive"].includes(block.type)) {
        validateRecords(block.items, `${path}.items`, block.type === "insights-archive" ? ["title", "path"] : ["title"]);
    }

    if (["service-category", "labor-certification", "industry-method", "career-benefits"].includes(block.type)) {
        const field = block.type === "service-category" ? "cards" : block.type === "career-benefits" ? "benefits" : "steps";
        validateRecords(block[field], `${path}.${field}`, ["title"]);
    }

    if (block.type === "industries-showcase") {
        validateRecords(block.clientLogos, `${path}.clientLogos`, ["name", "image"]);
    }

    if (block.type === "careers-roles") {
        requireObject(block.note, `${path}.note`);
        validateRichText(block.note.emphasis, `${path}.note.emphasis`);
        validateRecords(block.items, `${path}.items`, ["title"], (role, location) => {
            validateArray(role.details, `${location}.details`, validateRichText);
            requireObject(role.overview, `${location}.overview`);

            for (const field of ["responsibilities", "requirements", "offer"]) {
                requireObject(role[field], `${location}.${field}`);
                validateArray(role[field].items, `${location}.${field}.items`, validateRichText);
            }

            requireObject(role.application, `${location}.application`);
            requireFields(role.application, ["email"], `${location}.application`);
        });
    }

    if (block.type === "contact-section") {
        requireObject(block.form, `${path}.form`);
        requireObject(block.details, `${path}.details`);
        requireObject(block.details.labels, `${path}.details.labels`);
        requireObject(block.form.validationMessages, `${path}.form.validationMessages`);
        requireObject(block.form.statusMessages, `${path}.form.statusMessages`);
        validateRecords(block.form.fields, `${path}.form.fields`, ["id", "name", "type", "label"]);
    }
}

export function validateBlocks(blocks, path = "blocks", depth = 0) {
    if (!Array.isArray(blocks)) {
        fail(path, "ожидается список блоков в квадратных скобках");
    }

    if (depth > 12) {
        fail(path, "слишком много вложенных блоков");
    }

    const ids = new Set();

    blocks.forEach((block, index) => {
        const location = `${path}[${index}]`;

        if (!block || typeof block !== "object" || Array.isArray(block)) {
            fail(location, "блок должен быть объектом с полем type");
        }

        if (!Object.hasOwn(blockDefinitions, block.type)) {
            fail(`${location}.type`, `неизвестный блок "${block.type}"; проверьте его название`);
        }

        if (block.id !== undefined) {
            if (typeof block.id !== "string" || !block.id.trim() || ids.has(block.id)) {
                fail(`${location}.id`, "нужно непустое уникальное имя в этом списке");
            }

            ids.add(block.id);
        }

        if (block.hidden !== undefined && typeof block.hidden !== "boolean") {
            fail(`${location}.hidden`, "используйте true или false");
        }

        const definition = blockDefinitions[block.type];

        if (depth > 0 && !definition.flow) {
            fail(`${location}.type`, `Секцию ${block.type} разместите в основном blocks страницы, не внутри текстового блока`);
        }

        requireFields(block, definition.required || [], location);

        for (const field of definition.arrays || []) {
            if (!Array.isArray(block[field])) {
                fail(`${location}.${field}`, "ожидается список в квадратных скобках");
            }
        }

        if (definition.children) {
            validateBlocks(block.blocks, `${location}.blocks`, depth + 1);
        } else if (block.blocks !== undefined) {
            fail(`${location}.blocks`, "для вложенных блоков используйте type: content или section");
        }

        if (["image", "insight-cover"].includes(block.type) && (typeof block.src !== "string" || typeof block.alt !== "string")) {
            fail(`${location}.${typeof block.src !== "string" ? "src" : "alt"}`, "ожидается строка");
        }

        if (block.type === "heading" && block.level !== undefined && ![2, 3, 4, 5, 6].includes(block.level)) {
            fail(`${location}.level`, "выберите уровень заголовка от 2 до 6");
        }

        if (block.type === "table") {
            if (!block.columns.length) {
                fail(`${location}.columns`, "добавьте хотя бы один столбец");
            }

            block.rows.forEach((row, rowIndex) => {
                if (!Array.isArray(row) || row.length !== block.columns.length) {
                    fail(`${location}.rows[${rowIndex}]`, `нужно ${block.columns.length} ячеек, по количеству столбцов`);
                }

                row.forEach((cell, cellIndex) => {
                    const cellPath = `${location}.rows[${rowIndex}][${cellIndex}]`;
                    if (cell && typeof cell === "object" && !Array.isArray(cell)) {
                        if (cell.text === undefined || cell.text === null) {
                            fail(`${cellPath}.text`, "укажите текст ячейки");
                        }
                        validateRichText(cell.text, `${cellPath}.text`);
                    } else {
                        validateRichText(cell, cellPath);
                    }
                });
            });

            if (block.columnWidths !== undefined && (!Array.isArray(block.columnWidths) || block.columnWidths.length !== block.columns.length || block.columnWidths.some((width) => !Number.isFinite(width) || width <= 0))) {
                fail(`${location}.columnWidths`, "укажите положительную ширину для каждого столбца или удалите columnWidths");
            }
        }

        validateBlockData(block, definition, location);
        validateValues(block, location);
    });

    return blocks;
}

export function createContentCollection(modules, directory) {
    const slugs = new Set();

    return Object.entries(modules).map(([file, module]) => {
        const entry = module.default;
        const location = `${directory}/${file.replace(/^\.\/entries\//, "")}`;

        if (!entry || typeof entry !== "object") {
            fail(location, "файл должен содержать export default с данными страницы");
        }

        if (typeof entry.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug)) {
            fail(`${location}.slug`, "используйте строчные латинские буквы, цифры и дефисы");
        }

        if (slugs.has(entry.slug)) {
            fail(`${location}.slug`, `адрес "${entry.slug}" уже используется другой страницей`);
        }

        if (typeof entry.breadcrumb !== "string" || !entry.breadcrumb.trim()) {
            fail(`${location}.breadcrumb`, "заполните короткое название страницы");
        }

        slugs.add(entry.slug);
        validateBlocks(entry.blocks, `${location}.blocks`);
        return entry;
    });
}

export function groupPageBlocks(blocks) {
    const groups = [];
    let flow = [];

    function flush() {
        if (flow.length) {
            groups.push({ type: "content", blocks: flow });
            flow = [];
        }
    }

    for (const block of blocks) {
        if (block.hidden) {
            continue;
        }

        if (blockDefinitions[block.type]?.flow) {
            flow.push(block);
        } else {
            flush();
            groups.push(block);
        }
    }

    flush();
    return groups;
}
