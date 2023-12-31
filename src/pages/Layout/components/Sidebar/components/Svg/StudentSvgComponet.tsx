interface IProps {
  color?: string
}

const StudentSvgComponent = (props: IProps) => {
  const { color } = props
  return (
    <svg
      width={24}
      height={24}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 8c0 2.21-1.79 4-4 4s-4-1.79-4-4l.11-.94L5 5.5 12 2l7 3.5v5h-1V6l-2.11 1.06L16 8Zm-4 6c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
        fill={color}
      />
    </svg>
  )
}

export default StudentSvgComponent
