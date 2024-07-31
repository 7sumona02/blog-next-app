import React from 'react'
import prisma from '@/lib/prisma'
import Post from '@/components/Post';
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"

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
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-20">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recent Blog Posts</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our latest blog posts.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-4">
            {
              posts.map((post) => {
                const authorName = post.author ? post.author.name : 'Unknown Author'; 
                return (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    authorName={authorName}
                  />
                )
              })
            }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

