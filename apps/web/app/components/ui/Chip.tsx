export default function Chip({ title }: { title: string }) {
  return (
    <div className="w-fit rounded-lg bg-zinc-100 px-[10px] py-[6px] text-sm font-medium text-zinc-600">
      {title}
    </div>
  )
}
