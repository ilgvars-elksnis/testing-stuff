import Users from "../../../utils/dynamo/users";

export default async (event) => {
  try {
    const username = event.pathParameters?.username; // checks url username
    const user = await Users.query("username").eq(username).limit(1).exec(); //compares url username with the one in database
    //checks if there is username in url and if there are any usernames in database
    if (!user || user.count < 1) {
        return {
            statusCode: 404,
            body: "User not found"
        };
    }

    await Users.delete(user[0].id); // deletes user
    // if everthing is okay we print out success message
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(`User deleted: ${username}, Users name: (${user[0]?.vards})`),
      isBase64Encoded: false
    };// next is error segment if code breaks
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