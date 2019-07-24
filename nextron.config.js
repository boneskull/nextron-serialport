module.exports = {
  webpack: (config) => Object.assign(config, {
    entry: {
      serialport: './main/serialport.js',
    },
  }),
};
