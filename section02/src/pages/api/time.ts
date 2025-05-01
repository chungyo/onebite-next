import {NextApiRequest, NextApiResponse} from "next";

type Data = {
    time: string;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const date = new Date();
    res.json({time: date.toLocaleTimeString()});
}