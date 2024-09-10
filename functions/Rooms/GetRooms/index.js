const {db} = require('../../../services/index');
const { response } = require('../../../responses/index');
exports.handler = async (event) => {

  const { Items } = await db.scan({
    TableName: 'bonz-ai-db',
    FilterExpression: 'attribute_exists(#sk)',
    ExpressionAttributeNames: {
      '#sk': 'room'
    }
  });
  if (Items) {
    return response(200, Items);
  }

  return response(200, 'ok fungerar i GetRooms, men hittade inga rum');
};
