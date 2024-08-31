"use server"
import { writeFile } from 'fs/promises'

export async function uploadFile(file: File, loaction: string) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const path = `${loaction}${file.name}`
  await writeFile(path, buffer)

}