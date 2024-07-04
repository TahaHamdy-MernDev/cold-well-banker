import React from 'react'
import Api from '../../Api'
const loadLaunch = async (id)=>{
  const {data} = await Api.get(`/launch/get/${id}`)
}
export default function UpdateLaunch() {
  return (
    <div>UpdateLaunch</div>
  )
}
