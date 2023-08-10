const ButtonAnchor = ({ children, href }) => {
  return (
    <a
      href={href}
      className="hover:boder group relative flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:border-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </a>
  )
}

export default ButtonAnchor
