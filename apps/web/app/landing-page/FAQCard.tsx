type FAQCardProps = {
  title: string
  description: string
}

export const FAQCard = ({ description, title }: FAQCardProps) => (
  <div className="w-full p-4 md:w-1/2">
    <div className="shadow-10xl h-full rounded-2xl border border-gray-200 p-6">
      <h3 className="mb-4 text-lg font-semibold leading-normal">{title}</h3>
      <p className="font-sans leading-relaxed text-gray-600">{description}</p>
    </div>
  </div>
)
