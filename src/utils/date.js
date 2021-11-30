export const dateToLabel = (date) => {
    if (date) {
        const chunks = date.split("-");
        return chunks[2] + "/" + chunks[1];
    } else {
        return "";
    }
}
