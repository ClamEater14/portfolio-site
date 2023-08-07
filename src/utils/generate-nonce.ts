const generateNonce = (): string => {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64');
};

export default generateNonce;