import React from 'react'

export default function About() {
  return ( 
  <div className='min-h-screen flex items-center justify-center'>
    <div className='max-w-2xl mx-auto p-3 text-center'>
      <div>
        <h1 className='text-3xl font font-semibold text-center my-7'>
          About Factio
        </h1>
        <div className='text-md text-gray-500 flex flex-col gap-6'>
          <p>
            Welcome to Factio Blog! This blog was created by Sefa Alanur
            as a personal project to share some general knowledge and useful facts with the
            world. I am a passionate developer who loves to spread knowledge with people.
          </p>
          <p>
            On this blog, you'll find weekly articles and posts on topics
            such as science, technology, history, nature and more. I am
            always learning and exploring new facts, so be sure to check 
            back often for new content!
          </p>
          <p>
            I encourage you to leave comments on the posts and engage with
            other readers. You can like other people's comments and reply to
            them as well. I believe that a community of learners can help
            each other grow and improve.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}