'use client'
import { useEffect, useState } from 'react';
import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { getComments } from '@/lib/helpers';


export default function CommentSection({ postId }) {

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getComments(`/api/?postId=${postId}`)
        setData(records)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [postId])

  const cards = data.map((comment, index) => {
    return (
      <li key={index} className='flex gap-4 mb-4 min-h-[40px]'>
        <PersonIcon />
        <div>
          <h2 className='text-sm font-medium'>{comment.author}</h2>
          <p className='text-sm'>{comment.comment}</p>
        </div>
      </li>
    )
  })

  return (
    <ul className='w-full bg-white rounded-b-md py-3 px-4'>
      {cards}
    </ul>
  )
}
