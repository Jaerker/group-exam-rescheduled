const {db} = require('../../../services/index');
const {response} = require('../../../responses/index');
exports.handler = async (event) => {

  try{
    const {id} = event.pathParameters;
    if(id){
      const {Item} = await db.get({
        TableName: 'bonz-ai-db',
        Key: {
          pk: id,
          sk: 'room'
        }
      });
      if(Item){
        return response(200,Item);
      }
      return response(404,'Not Found');
  
    }
    return response(400,'Something wrong with id');
  }catch(error){
    return response(400, `Error: ${error}`);
  }

  };
