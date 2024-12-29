import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

export const encryptData = (data) => {
  try {
    const stringifiedData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(
      stringifiedData,
      SECRET_KEY
    ).toString();
    return encryptedData;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    console.log(bytes, "bytes");
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData, "bytes");
    return decryptedData;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

export const isDataExpired = (expiry) => {
  const expiryDate = new Date(expiry);
  const currentDate = new Date();
  return currentDate - expiryDate > 86400000;
};
