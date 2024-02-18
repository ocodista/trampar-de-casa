export const getImageUrl = (author: string) =>
  `/blog/entrevistas/${author.toLowerCase().replaceAll(' ', '-')}.jpeg`

export const getAudioUrl = (author: string) =>
  `/blog/entrevistas/${author.toLowerCase().replaceAll(' ', '-')}.mp3`
