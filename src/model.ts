export interface Entry {
    map(arg0: (entry: any) => JSX.Element): import("react").ReactNode;
    id: string,
    title: string,
    description: string
}

export function toEntry(doc): Entry {
    return { id: doc.id, ...doc.data() };
}