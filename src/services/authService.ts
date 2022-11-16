import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { users } from "@prisma/client";
import { createUserByData, findUserByUsername, createAccountWithUser } from "../repositories/authRepository.js";

export type CreateUserData = Omit<users, "id">;

export async function createNewUser( user: CreateUserData ) {
    const userData = await findUserByUsername( user.username );
    if( userData ) {
        throw {
            response:{
                message: "User is in use",
                status: 409
            }
        }
    };

    const cryptPassword = await bcrypt.hash(user.password, 10);

    await createUserByData( user.username, cryptPassword  );
};

export async function createNewAccount(username: string) {
	const userData = await findUserByUsername( username );
	if(!userData) {
		throw {
			response: {
				message: "user doesn't exist",
				status: 409
			}
		}
	};

	await createAccountWithUser( username );
}

export async function generateToken( user: CreateUserData ) {
    const userFromDatabase = await findUserByUsername( user.username );
    if( !userFromDatabase ) {
        throw {
            response:{
                message: "You must create a new profile",
                status: 401
            }
        }
    };

    const { password } = userFromDatabase; 
    const passwordBoolean: boolean = bcrypt.compareSync(user.password, password);
    if( !passwordBoolean ) {
        throw {
            response: {
                message: "Password is not valid",
                status: 401
            }
        }
    };

    const token = jwt.sign({ userId: userFromDatabase.id }, process.env.SECRET, {expiresIn: 86400});

    return token;
}