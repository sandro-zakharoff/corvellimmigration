export const guides = [
    { id: "eb-2", title: "How to sponsor an EB-2 employee" },
    { id: "perm", title: "How PERM labor certification works" },
    { id: "h-1b", title: "Sponsoring an H-1B specialty worker" },
    { id: "h-2b", title: "Running a compliant H-2B seasonal program" }
];

export function getGuide(id) {
    return guides.find((guide) => guide.id === id);
}
