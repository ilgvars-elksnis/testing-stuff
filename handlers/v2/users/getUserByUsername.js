import Users from "../../../utils/dynamo/users";

export default async (event) => {
  try {
    const username = event.pathParameters?.username; // checks url username
    const user = await Users.query("username").eq(username).exec(); //compares url username with the one in database
    //checks the username in url and if there are any usernames in database
    if (!user || user.count < 1) {
        return {
            statusCode: 404,
            body: "User not found"
        };
    }
    // if everthing is okay we print out the table
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(user[0]),
      isBase64Encoded: false
    };
  } catch (error) {
    // next is error segment if code breaks
    console.error(error);
    return {
      statusCode: 500,
      headers: {},
      body: "There has been an error! Our developers are fixing it!",
      isBase64Encoded: false
    };
  }
};