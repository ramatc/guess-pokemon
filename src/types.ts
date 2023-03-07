export interface Pokemon {
    id: number;
    name: string;
    image: string;
}

export type Form = HTMLFormElement & {
    pokemon: HTMLInputElement;
}