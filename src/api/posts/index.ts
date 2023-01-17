import {UmiApiRequest, UmiApiResponse} from "umi";
import {PrismaClient} from "@prisma/client";
import dayjs from "dayjs";
import {verifyToken} from "@/utils/jwt";

export default async function (req:UmiApiRequest,res:UmiApiResponse){
  const p = new PrismaClient();
  if (req.method == "POST"){
    try {
      if (req.cookies && req.cookies.token){

        const data = await p.post.create({
          data:{
            createdAt:getFormattedNowDate(),
            updatedAt:getFormattedNowDate(),
            title:req.body.title,
            content:req.body.title,
            authorId:(await verifyToken(req.cookies.token)).id,
            imageUrl:req.body.imageUrl,
            tags:req.body.tags
          }
        })

        res.status(200).json({code:0,msg:"操作成功",data})
        await p.$disconnect();
      }else{
        res.status(200).json({code:-1,msg:"未登录"})
      }

    }catch (e:any){
      console.log(e)
      res.status(500).json({
        result: false,
        message: typeof e.code === 'string' ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + e.code.toLowerCase() : e
      })
    }
  }else if(req.method == "GET"){
    const data = await p.post.findMany();
    res.status(200).json({code:0,data})
    await p.$disconnect();
    
  }else{
    res.status(405).json({error:"请求方法不支持"})
  }
}

function getFormattedNowDate(){
  return dayjs().format();
}