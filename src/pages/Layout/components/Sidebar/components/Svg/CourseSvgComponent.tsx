interface IProps {
  color?: string
}

const CourseSvgComponent = (props: IProps) => {
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
        d="M15.25 13h2l-.5 2h-2l.5-2ZM22 8v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6l2 2h8a2 2 0 0 1 2 2Zm-2 4h-1.5l.5-2h-1l-.5 2h-2l.5-2h-1l-.5 2H13v1h1.25l-.5 2H12v1h1.5l-.5 2h1l.5-2h2l-.5 2h1l.5-2H19v-1h-1.25l.5-2H20v-1Z"
        fill={color}
      />
    </svg>
  )
}

export default CourseSvgComponent
