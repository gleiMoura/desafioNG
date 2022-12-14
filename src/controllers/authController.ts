import { Request, Response } from "express";
import { createNewUser, generateToken, createNewAccount } from "../services/authService.js";

export async function createUser( req: Request, res: Response ) {
    const user = req.body;

    await createNewUser( user );

		await createNewAccount(user.username);

    res.sendStatus( 201 );
};

export async function doLogin ( req: Request, res: Response ) {
    const user = req.body;

    const token = await generateToken( user );

    const data = {
        email: user.email,
        token
    };

    res.status( 200 ).send( data );
};