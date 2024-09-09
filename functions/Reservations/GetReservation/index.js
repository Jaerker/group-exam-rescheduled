exports.handler = (statusCode, body) => {

  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
  };
};
