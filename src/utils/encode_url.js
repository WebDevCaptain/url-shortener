exports.encodeURL = (theta) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = chars.length;
  let res = [];

  while (theta > 0) {
    res.push(chars[theta % base]);
    theta = parseInt(Math.floor(theta / base));
  }

  return res.reverse().join("");
};
