import * as SerialPort from 'serialport';

const listAllAvailables = async () => {
  return await SerialPort.list();
};

export {
  listAllAvailables,
};
