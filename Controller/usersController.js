import{
    getUsers,
    getSingleUser,
    insertedUser,
    deleteUser,
    updateUser
} from "../model/usersModel.js"


const getusersCon = async (req, res) => {
    res.json({
      All_Users: await getUsers(),
    });
}

const getSingleuserCon =  async (req, res) => {
    res.json({
      single_user: await getSingleUser(req.params.user_id),
    });
}

const addUserCon = async (req, res) => {
  try {
      const { name, email, password, phone, address } = req.body;
      
      // Check if email and other required fields are not null
      if (!email || !name || !password) {
          return res.status(400).send("Name, email, and password are required.");
      }

      const result = await insertedUser(name, email, password, phone, address);
      res.status(201).send(result);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error inserting user");
  }
};

const editUserCon = async (req, res) => {
    const { user_id } = req.params;
    const { name, email, password, phone, address} = req.body;
  
    const result = await updateUser(user_id, { name, email, password, phone, address });
    res.json({
      updated_user: result,
    });
  }

  const deleteUserCon = async (req, res) => {
    const user_id = req.params.user_id;
    console.log("Deleting user with ID:", user_id); // Log the ID to verify

    try {
        const result = await deleteUser(user_id);
        res.json({
            deleted_user: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting user");
    }
}

export{getSingleuserCon, getusersCon, addUserCon, editUserCon, deleteUserCon}

