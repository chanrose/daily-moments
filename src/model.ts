export interface Entry {
    map(arg0: (entry: any) => JSX.Element): import("react").ReactNode;
    id: string,
    title: string,
    description: string,
    date: string
}

export function toEntry(doc): Entry {
    return { id: doc.id, ...doc.data() };
}

export const formatDate = (ISOstring:string) => {
    const dayjs = require('dayjs');
    const date = dayjs(ISOstring);
    date.toISOString();
    return (
      date.format('MMM-DD-YYYY')
    );
  }