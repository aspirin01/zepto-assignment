import type { NextApiRequest, NextApiResponse } from 'next'
 
import { promises as fs } from 'fs';

type ResponseData = {
  data: [{
    id: number,
    user: string,
    email: string,
  }]
}
 

const users:any = [
  {
    "name": "John Doe",
    "email": "john.doe@gmail.com"
  },
  {
    "name": "Jane Smith",
    "email": "jane.smith@yahoo.com"
  },
  {
    "name": "Michael Johnson",
    "email": "michael.johnson@example.com"
  },
  {
    "name": "Emily Davis",
    "email": "emily.davis@hotmail.com"
  },
  {
    "name": "Christopher Brown",
    "email": "chris.brown@gmail.com"
  },
  {
    "name": "Emma Wilson",
    "email": "emma.wilson@yahoo.com"
  },
  {
    "name": "David Taylor",
    "email": "david.taylor@example.com"
  },
  {
    "name": "Sophia Anderson",
    "email": "sophia.anderson@hotmail.com"
  },
  {
    "name": "Matthew Miller",
    "email": "matthew.miller@gmail.com"
  },
  {
    "name": "Olivia Moore",
    "email": "olivia.moore@yahoo.com"
  },
  {
    "name": "Daniel Harris",
    "email": "daniel.harris@example.com"
  },
  {
    "name": "Ava Jackson",
    "email": "ava.jackson@hotmail.com"
  },
  {
    "name": "Andrew Thomas",
    "email": "andrew.thomas@gmail.com"
  },
  {
    "name": "Isabella White",
    "email": "isabella.white@yahoo.com"
  },
  {
    "name": "Ethan Clark",
    "email": "ethan.clark@example.com"
  },
  {
    "name": "Mia Turner",
    "email": "mia.turner@hotmail.com"
  },
  {
    "name": "James Wilson",
    "email": "james.wilson@gmail.com"
  },
  {
    "name": "Emma Taylor",
    "email": "emma.taylor@yahoo.com"
  },
  {
    "name": "William Brown",
    "email": "william.brown@example.com"
  },
  {
    "name": "Sophia Harris",
    "email": "sophia.harris@hotmail.com"
  }
];

async function readDataFromFileHandler(url:string){
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
  let data = users;
  data =data.map((user:any, index:any) => ({  id: index + 1 ,...user}));

  res.status(200).json({ data: data})
}