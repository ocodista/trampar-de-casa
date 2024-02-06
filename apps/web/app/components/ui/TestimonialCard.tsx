import React from 'react'

const TestimonialCard = ({
  avatarUrl,
  name,
  username,
  jobTitle,
  remoteWorkDuration,
  quote,
}) => (
  <figure className="mx-auto flex max-w-sm flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
    <div className="flex gap-4">
      <img
        alt="name"
        className="rounded-md border"
        src={avatarUrl}
        width="150px"
        height="150px"
      />
      <div className="flex flex-col">
        <h5 className=" text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {username}
        </span>
      </div>
    </div>
    <figcaption className="mt-10 text-sm text-xs font-[5px] font-bold text-gray-500 dark:text-gray-400">
      {jobTitle}
    </figcaption>
    <blockquote
      dangerouslySetInnerHTML={{ __html: quote }}
      className="my-2 text-center text-justify text-gray-500 dark:text-gray-400"
    ></blockquote>
    <span className="text-right text-xs italic text-gray-500 dark:text-gray-400">
      Remoto há {remoteWorkDuration}
    </span>
  </figure>
)

export default TestimonialCard
