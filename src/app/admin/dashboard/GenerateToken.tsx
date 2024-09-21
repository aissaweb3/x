"use client";

    
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { sign } from 'jsonwebtoken';
import FormBtn from '@/components/simple/FormBtn';
import generateJWT from './server/jwt';

export default function GenerateToken({adminToken}: {adminToken: string}) {
  const [tokenLifetime, setTokenLifetime] = useState('24')
  const [generatedToken, setGeneratedToken] = useState('')

  const handleGenerateToken = async () => {
    const token = await generateJWT(tokenLifetime, adminToken)
    setGeneratedToken(token)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">JWT Generator</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="tokenLifetime">Token Lifetime (hours)</Label>
          <Input
            id="tokenLifetime"
            type="number"
            value={tokenLifetime}
            onChange={(e) => setTokenLifetime(e.target.value)}
          />
        </div>
        <form action={handleGenerateToken}>
          <FormBtn className="w-full">
            Generate Token
          </FormBtn>
        </form>
        {generatedToken && (
          <div>
            <Label htmlFor="generatedToken">Generated Token</Label>
            <Textarea
              id="generatedToken"
              value={generatedToken}
              readOnly
              className="h-24"
            />
          </div>
        )}
      </div>
    </div>
  )
}