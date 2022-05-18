import React from 'react'

interface IProps {
  text: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = (props: IProps) =>
  <button
    type="button"
    className="a-button a-button--size__normal"
    onClick={props.onClick}
  >
    <strong>{props.text}</strong>
  </button>