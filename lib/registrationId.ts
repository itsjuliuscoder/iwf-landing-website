import { customAlphabet } from "nanoid";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const generateSuffix = customAlphabet(alphabet, 8);

export function createRegistrationId(): string {
  return `IWF27-${generateSuffix()}`;
}
