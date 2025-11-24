import React from 'react'
import { Badge } from './ui/badge'
type Props = {
    data : string
}
export default function PendingBadge({data} : Props) {
  return (
    <Badge variant='destructive' className='w-28 py-1 mt-2'>{data}</Badge>
  )
}
