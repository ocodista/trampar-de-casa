const ButtonAnchor = ({ children, href, ...props }) => {
  return (
    <a
      href={href}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-white hover:boder hover:border-black hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {children}
    </a>
  )
}

export default ButtonAnchor
