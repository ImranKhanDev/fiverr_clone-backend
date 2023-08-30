const createErrors = (status, msg) => {
  const err = new Error();
  err.status = status;
  err.msg = msg;
  return err

};

export default createErrors