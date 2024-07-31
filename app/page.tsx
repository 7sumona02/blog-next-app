import React from 'react'
import prisma from '@/lib/prisma'

async function getPosts(){
  const posts = await prisma.post.findMany({
    where:
      {published: true},
      include: {
        author: {
          select: {name: true}
        }
      }
  })
  return posts;
}

export default async function Page() {
  const posts = await getPosts();
  console.log({posts})
  return (
    <div className='h-screen w-full flex justify-center mt-[10vh]'>
      <h1 className='text-2xl'>Feed</h1>
    </div>
  )
}

