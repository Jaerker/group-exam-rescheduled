const {db} = require('../../../services/index');
const { response } = require('../../../responses/index');
exports.handler = async (event) => {

  const {avaliableRoomsOnly} = event?.queryStringParameters;

  const { Items } = await db.scan({
    TableName: 'bonz-ai-db',
    FilterExpression: 'attribute_exists(#sk)',
    ExpressionAttributeNames: {
      '#sk': 'sk'
    }
  });
  if (Items) {

    if(avaliableRoomsOnly === 'true'){
      return response(200, Items.filter((item) => item.object.isAvaliable === true));
    }


    return response(200, Items);
  }

  return response(200, event);
};
