import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { foregroundColorNames } from "chalk";
dotenv.config();

export default function getUserIdByToken(authorization: string): number {
    if (!authorization) {
        throw {
            response: {
                message: "Authorization problem",
                status: 422
            }
        }
    }

    const token = authorization?.replace("Bearer ", "");

    let userId = null;

    jwt.verify(token, process.env.SECRET, (err, decoded: { userId: number }) => {
        if (err) {
            throw {
                response: {
                    message: "Invalid authentication!",
                    status: 401
                }
            }
        };

    userId = decoded.userId;
    });

    return userId;
};

export function verifyElement( data: {userId: number}, userId: number, element: string) {
    if( !data ) {
        throw {
            response: {
                message: `This/those ${element} doesn't exist`,
                status: 404
            }
        }
    };

    if( data.userId !== userId ) {
        throw {
            response:{
                message: `this ${element} is not yours`,
                status: 422
            }
        }
    }
};

export function formatDate(date: Date) {
	const day  = date.getDate().toString(),
        dayF = (day.length == 1) ? '0'+ day : day,
        month  = (date.getMonth()+1).toString(),
        monthF = (month.length == 1) ? '0' + month : month,
        yearF = date.getFullYear();

	const hourF = date.getHours(), 
				minutesF = date.getMinutes(),
				secondsF = date.getSeconds()

	const newDate = `${dayF}/${monthF}/${yearF} ${hourF}:${minutesF}`;

	console.log(newDate)
	return newDate
};