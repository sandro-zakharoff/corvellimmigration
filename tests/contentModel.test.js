import assert from "node:assert/strict";
import test from "node:test";
import { createContentCollection, groupPageBlocks, isContentLink, validateBlocks } from "../src/lib/content/contentModel.js";

test("the same ordered blocks support text, images, sections and shared page sections", () => {
    const blocks = [
        { type: "page-intro", title: "Title" },
        { type: "paragraph", text: "Before" },
        { type: "image", src: "/images/example.jpg", alt: "Example" },
        { type: "section", title: "Details", blocks: [{ type: "paragraph", text: "Inside" }] },
        { type: "action-banner", title: "Contact us" },
        { type: "paragraph", text: "After" }
    ];

    assert.equal(validateBlocks(blocks), blocks);
    const grouped = groupPageBlocks(blocks);
    assert.deepEqual(grouped.map((block) => block.type), ["page-intro", "content", "action-banner", "content"]);
    assert.deepEqual(grouped[1].blocks, blocks.slice(1, 4));
    assert.equal(grouped[3].blocks[0].text, "After");
    assert.equal(blocks.length, 6);
});

test("blocks can be repeated, reordered and hidden without changing templates", () => {
    const blocks = [
        { type: "paragraph", text: "Second" },
        { type: "action-banner", title: "Hidden", hidden: true },
        { type: "paragraph", text: "First" },
        { type: "paragraph", text: "First" }
    ];

    validateBlocks(blocks);
    assert.deepEqual(groupPageBlocks(blocks)[0].blocks.map((block) => block.text), ["Second", "First", "First"]);
    assert.deepEqual(groupPageBlocks([]), []);
});

test("unknown nested block types and missing required fields report the exact location", () => {
    assert.throws(() => validateBlocks([{ type: "content", blocks: [{ type: "imgae" }] }], "technology.blocks"), /technology.blocks\[0\].blocks\[0\].type.*imgae/);
    assert.throws(() => validateBlocks([{ type: "image", src: "/image.jpg" }]), /blocks\[0\].alt/);
    assert.throws(() => validateBlocks([{ type: "section" }]), /blocks\[0\].blocks/);
    assert.throws(() => validateBlocks([{ type: "paragraph", text: "Text", hidden: "false" }]), /hidden/);
});

test("tables default to equal column widths and reject missing cells or invalid widths", () => {
    const table = { type: "table", columns: ["Name", "Value"], rows: [["One", "Two"]] };
    validateBlocks([table]);
    assert.throws(() => validateBlocks([{ ...table, rows: [["One"]] }]), /rows\[0\].*2/);
    assert.throws(() => validateBlocks([{ ...table, columnWidths: [1, 0] }]), /columnWidths/);
    assert.throws(() => validateBlocks([{ ...table, columns: [] }]), /columns/);
});

test("collection discovery preserves entries and detects conflicting or malformed addresses", () => {
    const entry = { slug: "technology", breadcrumb: "Technology", blocks: [] };
    const modules = { "./entries/technology.js": { default: entry } };
    assert.deepEqual(createContentCollection(modules, "industryPages"), [entry]);
    assert.throws(() => createContentCollection({ ...modules, "./entries/copy.js": { default: entry } }, "industryPages"), /copy.js.slug.*technology/);
    assert.throws(() => createContentCollection({ a: { default: { ...entry, slug: "Technology / New" } } }, "industryPages"), /slug/);
    assert.throws(() => createContentCollection({ a: {} }, "industryPages"), /export default/);
});

test("duplicate optional block ids and unsafe links are rejected", () => {
    assert.throws(() => validateBlocks([{ type: "paragraph", id: "same", text: "A" }, { type: "paragraph", id: "same", text: "B" }]), /blocks\[1\].id/);
    assert.throws(() => validateBlocks([{ type: "paragraph", text: [{ text: "Unsafe", path: "javascript:alert(1)" }] }]), /text\[0\].path/);

    for (const path of ["/contact", "#details", "https://example.com", "mailto:office@example.com", "tel:+123456789"]) {
        assert.equal(isContentLink(path), true);
    }

    for (const path of ["javascript:alert(1)", "//example.com", "/\\example.com", "https://example.com/a b"]) {
        assert.equal(isContentLink(path), false);
    }
});

test("industry groups, tracks and related tags report malformed nested arrays before rendering", () => {
    const roles = { type: "industry-roles", title: "Roles", groups: [{ title: "Crew", items: [{ title: "Carpenter" }] }] };
    const process = { type: "industry-process", title: "Process", tracks: [{ title: "Temporary", steps: [{ title: "File" }] }] };
    const related = { type: "industry-related", title: "Related", items: [{ title: "Technology", path: "/industries/technology", tags: ["H-1B"] }] };
    validateBlocks([roles, process, related]);

    assert.throws(() => validateBlocks([{ ...roles, groups: [{ title: "Crew" }] }]), /blocks\[0\].groups\[0\].items/);
    assert.throws(() => validateBlocks([{ ...roles, groups: [null] }]), /blocks\[0\].groups\[0\]/);
    assert.throws(() => validateBlocks([{ ...process, tracks: [{ title: "Temporary", steps: "File" }] }]), /tracks\[0\].steps/);
    assert.throws(() => validateBlocks([{ ...process, tracks: [{ title: "Temporary", steps: [null] }] }]), /tracks\[0\].steps\[0\]/);
    assert.throws(() => validateBlocks([{ ...related, items: [{ title: "Technology", path: "/industries/technology" }] }]), /items\[0\].tags/);
});

test("article lists, statistics, timelines and table cells reject incomplete item records", () => {
    validateBlocks([
        { type: "list", items: [{ text: "A list item without a heading" }] },
        { type: "insight-stats", items: [{ value: 0, label: "Cases" }] },
        { type: "timeline", items: [{ date: "January", text: "Filed" }] },
        { type: "table", columns: ["A", "B"], rows: [[{ text: "", emphasis: true }, [{ text: "Linked", path: "/contact" }]]] }
    ]);

    assert.throws(() => validateBlocks([{ type: "list", items: ["Plain item"] }]), /items\[0\]/);
    assert.throws(() => validateBlocks([{ type: "list", items: [{ title: "Missing text" }] }]), /items\[0\].text/);
    assert.throws(() => validateBlocks([{ type: "insight-stats", items: [{ label: "Cases" }] }]), /items\[0\].value/);
    assert.throws(() => validateBlocks([{ type: "timeline", items: [{ date: {} , text: "Filed" }] }]), /items\[0\].date.text/);
    assert.throws(() => validateBlocks([{ type: "table", columns: ["A"], rows: [[{ tone: "muted" }]] }]), /rows\[0\]\[0\].text/);
    assert.throws(() => validateBlocks([{ type: "table", columns: ["A"], rows: [[{ text: { label: "Wrong" } }]] }]), /rows\[0\]\[0\].text.text/);
});

test("common links require a destination and the label rendered by their component", () => {
    validateBlocks([
        { type: "action-banner", title: "Contact", link: { path: "/contact", label: [{ text: "Write", strong: true }] } },
        { type: "guide-collection", title: "Guides", guides: [{ id: "eb-2", title: "Guide" }] }
    ]);

    assert.throws(() => validateBlocks([{ type: "action-banner", title: "Contact", link: "/contact" }]), /blocks\[0\].link/);
    assert.throws(() => validateBlocks([{ type: "action-banner", title: "Contact", link: { label: "Write" } }]), /link.path/);
    assert.throws(() => validateBlocks([{ type: "link-list-cta", title: "Contact", links: [{ path: "/contact" }] }]), /links\[0\].label/);
    assert.throws(() => validateBlocks([{ type: "guide-collection", title: "Guides", guides: [{ id: "eb-2", label: "Guide" }] }]), /guides\[0\].title/);
    assert.throws(() => validateBlocks([{ type: "guide-collection", title: "Guides", guides: [{ id: "unknown", title: "Guide" }] }]), /guides\[0\].id/);
    assert.throws(() => validateBlocks([{ type: "insights-archive", title: "Archive", items: [{ title: "Brief" }] }]), /items\[0\].path/);
});

test("rich text accepts supported parts and rejects nested objects with precise paths", () => {
    validateBlocks([
        { type: "paragraph", text: ["A ", { text: "formatted", strong: true, italic: true, accent: true }, " value: ", 0] },
        { type: "paragraph", text: { text: "Contact", path: "/contact" } },
        { type: "page-intro", title: "Title", descriptionParts: [{ text: "Description", emphasis: true }] }
    ]);

    assert.throws(() => validateBlocks([{ type: "paragraph", text: { label: "Wrong property" } }]), /blocks\[0\].text.text/);
    assert.throws(() => validateBlocks([{ type: "paragraph", text: [{ text: { text: "Too deep" } }] }]), /text\[0\].text/);
    assert.throws(() => validateBlocks([{ type: "paragraph", text: [{ text: "Bold", strong: "yes" }] }]), /text\[0\].strong/);
    assert.throws(() => validateBlocks([{ type: "paragraph", text: true }]), /blocks\[0\].text/);
    assert.throws(() => validateBlocks([{ type: "page-intro", title: "Title", descriptionParts: "Description" }]), /descriptionParts/);
});

test("optional fields stay optional and validate their shape when provided", () => {
    validateBlocks([
        { type: "industry-hero", title: "Industry", image: "/hero.jpg" },
        { type: "industry-cost", title: "Costs" },
        { type: "industry-testimonial", title: "Proof", quote: "A quote" },
        { type: "insight-header", title: "Article" },
        { type: "aside", text: "An aside without a title" },
        { type: "heading", text: "Small heading", level: 6 }
    ]);

    assert.throws(() => validateBlocks([{ type: "industry-hero", title: "Industry", image: "/hero.jpg", tags: "H-1B" }]), /tags/);
    assert.throws(() => validateBlocks([{ type: "industry-cost", title: "Costs", points: {} }]), /points/);
    assert.throws(() => validateBlocks([{ type: "insight-header", title: "Article", meta: "January" }]), /meta/);
    assert.throws(() => validateBlocks([{ type: "heading", text: "Wrong level", level: 1 }]), /level/);
    assert.throws(() => validateBlocks([{ type: "image", src: "/hero.jpg", alt: 42 }]), /blocks\[0\].alt/);
});

test("ordinary block arrays and nested profile fields are validated against the renderer", () => {
    validateBlocks([{ type: "service-category", title: "Services", cards: [{ title: "H-1B" }] }]);
    assert.throws(() => validateBlocks([{ type: "service-category", title: "Services", items: [] }]), /cards/);
    assert.throws(() => validateBlocks([{ type: "team-profiles", title: "Team", members: [{ name: "Name", biography: "Biography", facts: [] }] }]), /members\[0\].biography/);
    assert.throws(() => validateBlocks([{ type: "team-profiles", title: "Team", members: [{ name: "Name", biography: [], facts: [null] }] }]), /members\[0\].facts\[0\]/);
    assert.throws(() => validateBlocks([{ type: "industry-directory", title: "Industries", industries: [{ title: "Industry", path: "/industry" }] }]), /industries\[0\].visaTypes/);
});

test("structured careers notes and contact form objects are not mistaken for rich text", () => {
    const careers = {
        type: "careers-roles",
        title: "Careers",
        note: { emphasis: "A note", description: "More detail" },
        items: [{
            title: "Role", details: [], overview: {}, responsibilities: { items: [] },
            requirements: { items: [] }, offer: { items: [] }, application: { email: "jobs@example.com" }
        }]
    };
    const contact = {
        type: "contact-section", details: { labels: {} },
        form: { fields: [], validationMessages: {}, statusMessages: {} }
    };
    validateBlocks([careers, contact]);
    assert.throws(() => validateBlocks([{ ...careers, items: [{ ...careers.items[0], responsibilities: {} }] }]), /items\[0\].responsibilities.items/);
    assert.throws(() => validateBlocks([{ ...careers, note: "Plain note" }]), /blocks\[0\].note/);
    assert.throws(() => validateBlocks([{ ...contact, form: { ...contact.form, fields: [null] } }]), /form.fields\[0\]/);
    assert.throws(() => validateBlocks([{ ...contact, details: {} }]), /details.labels/);
});

test("full page sections remain top level while text sections accept nested flow blocks", () => {
    validateBlocks([
        { type: "content", blocks: [{ type: "timeline", items: [] }, { type: "section", blocks: [{ type: "paragraph", text: "Nested text" }] }] },
        { type: "action-banner", title: "Contact" }
    ]);

    assert.throws(
        () => validateBlocks([{ type: "content", blocks: [{ type: "action-banner", title: "Contact" }] }]),
        /blocks\[0\].blocks\[0\].type.*Секцию action-banner разместите в основном blocks страницы/
    );
    assert.throws(() => validateBlocks([{ type: "section", blocks: [{ type: "content", blocks: [] }] }]), /blocks\[0\].blocks\[0\].type.*Секцию content/);
});
