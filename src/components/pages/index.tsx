import React, { useEffect } from 'react'
import axios from 'axios'
import { LpHeader } from '@/components/organisms/lp-header'

export const LpPage = () => {

  // useEffect(() => {
  //   const initialize = async () => {
  //     axios.post("http://127.0.0.1:8000/api/auth/token/login", {
  //       "password": "Asilasil2",
  //       "username": "shouheitakai"
  //     }).then(value => {
  //       console.log(value)
  //     }).catch(error => {
  //       console.error(error)
  //     })
  //   }
  //   initialize()
  // })
  return (
    <article className="p-lp">
      <LpHeader />
      <h1>LPです</h1>
    </article>
  )
}