import { User } from "../models/user";
import userRepository from "../repositories/user.js";
import { apiErrors, appMessageErros } from "../errors/index.js";

async function getUserOrThrow(email: string): Promise<User> {

    const findUser = await userRepository.findUserByEmail(email);

    if (!findUser) {
        apiErrors.NotFound(appMessageErros.auth.user.notFound);
    }

    return findUser;
}

const userService = {

    getUserOrThrow
}

export default userService;