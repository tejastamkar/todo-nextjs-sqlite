import { AES, enc, HmacSHA256 } from "crypto-js";

export function encrypt(data: string) {
  return AES.encrypt(data, process.env.AES_TOKEN || "").toString();
}
export function decrypt(data: string) {
  return AES.decrypt(data, process.env.AES_TOKEN || "").toString(enc.Utf8);
}
export function generateHash(data: string) {
  return HmacSHA256(data, process.env.HMAC_TOKEN || "").toString();
}
