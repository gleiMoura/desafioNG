import prisma from "../config/database.js";

export async function findUserByUsername( username: string ) {
    const data = await prisma.users.findUnique({
        where: {
            username
        }
    });

    return data;
};

export async function createUserByData ( username: string, password: string ) {
    await prisma.users.create({
        data:{
            username,
            password
        }
    }); 
};

export async function createAccountWithUser(username: string) {
	const accountData = await prisma.accounts.create({
		data: {
			balance: 100
		}
	});

	const id = accountData.id;

	await prisma.users.update({
		where: {
			username
		},
		data: {
			accountId: id
		}
	});
};