import {PrismaClient} from "@prisma/client";
import {UmiApiRequest, UmiApiResponse} from "umi";


export default async function (req: UmiApiRequest, res: UmiApiResponse) {

  const id = req.params.postId;

  const p = new PrismaClient();
  const data = await p.post.findUnique({
    where: {id: +id},
    include: {author: true}
  });

  res.status(200).json({code: 0, data})
  await p.$disconnect();
}
