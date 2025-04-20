import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export const bcryptHash = (payload: string): string => {
    const salt: string = genSaltSync(10);
    const hash = hashSync(payload, salt);

    return hash;
}
export const bcryptCompare = (payload: string, payloadHased: string): boolean => {
    return compareSync(payload, payloadHased);
};