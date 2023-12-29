const now = (): string => new Date().getTime().toString();

const createdAtAndUpdatedAtNow = () => {
    return {
        createdAt: now(),
        updatedAt: now(),
    }
};

const utils = {
    now,
    createdAtAndUpdatedAtNow
}

export default utils;