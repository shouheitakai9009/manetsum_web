import React from 'react'
import { Link } from 'react-router-dom'

export const SiteLogo = () =>
  <Link to='/'>
    <h2 className="m-sitelogo">
      <strong className="m-sitelogo--yellow">M</strong>
      <strong className="m-sitelogo--lightblue">A</strong>
      <strong className="m-sitelogo--orange">N</strong>
      <strong className="m-sitelogo--teal">E</strong>
      <strong className="m-sitelogo--blue">T</strong>
      <strong className="m-sitelogo--pink">S</strong>
      <strong className="m-sitelogo--yellow">U</strong>
      <strong className="m-sitelogo--red">M</strong>
    </h2>
  </Link>