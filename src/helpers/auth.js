// Gives each role a value to determine hierarchy
const rightsSchema = {
  "member": 1,
  "admin": 2,
  "superadmin": 3,
};

// Check for authentication, and a user-type (if one is specified)
export const isUserValid = (authentication, minType = null) => {

  const { user, isAuthenticated } = authentication;

  const { user_type } = user;

  // If the user is authenticated
  if (isAuthenticated) {

    // If a prerequisite role is passed
    if (minType) {

      // Check if the type that the user_type resolves to (value) is of or greater
      // than the prerequisite roles' value
      const typeRights = rightsSchema[user_type];

      const minTypeRights = rightsSchema[minType];

      return typeRights >= minTypeRights;

    }

    // Valid if there's no user-type data passed
    return true;

  }

  return false;

};
