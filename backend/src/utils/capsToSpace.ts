export const capsToSpace = (text: string) => {
    const split = text.split("");
    const reconstruction = [];

    for (const character of split) {
        let char = character;
        if (character.toUpperCase() === character) char += ` ${character.toLowerCase()}`;
        reconstruction.push(char);
    }

    return reconstruction.join("");
};
