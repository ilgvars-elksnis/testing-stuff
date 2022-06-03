import Users from '../../../utils/dynamo/users';

export default async (event) => {
  try {
    const body = JSON.parse(event.body); // creates JSON body with the data
    const user = await Users.create(body); // puts data in our database

    return {
      statusCode: 200,
      body: JSON.stringify(user), // shows data we inserted into table
    };
  } catch (error) {
    console.error(error);
    return {
        statusCode: 500,
        headers: {},
        body: "There has been an error! Our developers are fixing it!",
        isBase64Encoded: false
    };
  }
};