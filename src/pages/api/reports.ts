import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method == "POST") {
		console.log(req.body);
    	
	}
	res.status(200);
}

export default handler;