const fingerprint = (): number => {
  const { width, height } = screen;
  const { appVersion, userAgent } = navigator;
  const finger = 123;
  return finger;
};

export default fingerprint;
