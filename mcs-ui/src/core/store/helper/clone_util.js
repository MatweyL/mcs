// FIXME: замена deep-copy :/
export const clone = (value) => JSON.parse(JSON.stringify(value))