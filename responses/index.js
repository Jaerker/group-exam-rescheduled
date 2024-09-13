exports.response = (statusCode, body) => {

  return {
    statusCode: statusCode,
    body: JSON.stringify(body)
  };
};
