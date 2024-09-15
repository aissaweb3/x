"use client"

import { useState } from 'react'
import axios from 'axios'
import { Upload, X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function UploadForm({ onUploadSuccess }: { onUploadSuccess: any }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setFile(selectedFile || null)
    setError(null)

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const fileName = response.data;
      onUploadSuccess(fileName);
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-[#020a10] border rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Upload Your Image</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="file-upload" className="flex h-fit flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center p-4">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              </div>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          
          {preview && (
            <div className="relative mt-4">
              <Image width="100" height="100" src={preview} alt="File preview" className="rounded-lg w-full h-48 object-cover" />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Remove file"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}
          
          {file && !preview && (
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="text-sm text-gray-600 truncate">{file.name}</span>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Remove file"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <Button
            type="submit"
            className="w-full"
            disabled={!file || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload File'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}