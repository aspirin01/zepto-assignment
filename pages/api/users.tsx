import type { NextApiRequest, NextApiResponse } from 'next'
 
import { promises as fs } from 'fs';

type ResponseData = {
  data: [{
    id: number,
    user: string,
    email: string,
  }]
}
 
async function readDataHandler(url:string){
  try {
    const file = await fs.readFile(process.cwd() + url, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
    throw error;
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let data = await readDataHandler('/pages/api/data.json');
  data =data.map((user:any, index:any) => ({  id: index + 1 ,...user}));

  res.status(200).json({ data: data})
}