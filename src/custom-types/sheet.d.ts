interface ISheet {
    title: string;
    timeSignature: [number, number];
    tracks: Array<{
        name: string, sheet: Array<{
            index: number,
            note: number,
            start: number,
        }>,
    }>;
}
