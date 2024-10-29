import { sendResumeToR2 } from 'app/(roles)/application/action'

export const uploadResume = async (file: File): Promise<string | null> => {
  try {
    const sanitizedFileName = file.name.replace(/\s+/g, '_')
    const fileName = `resume_${Date.now()}_${sanitizedFileName}`
    const fileBuffer = await file.arrayBuffer()
    const base64FileBuffer = Buffer.from(fileBuffer).toString('base64')

    await sendResumeToR2({
      fileName,
      fileBuffer: base64FileBuffer,
      contentType: file.type,
    })

    const bucketUrl = 'https://pub-b4f7c986aa7b4e89baa8b33ffcc31fb7.r2.dev'
    const resumeUrl = `${bucketUrl}/${fileName}`

    return resumeUrl
  } catch (error) {
    console.error('Erro ao fazer upload do currículo:', error)
    return null
  }
}
