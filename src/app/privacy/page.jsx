import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Header from '@/components/header'

export default function PrivacyPolicy() {
  return (

    <div
      style={{
        fontFamily: "'CustomFont'",
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingBottom: "5rem"
      }}
      className="relative min-h-screen"
    >
      <div className="relative" style={{ zIndex: "2" }}>
        <Header showGhosts />
      </div>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy of the Forbidden Forest</h1>
      <ScrollArea className="h-[600px] w-full rounded-md border p-4" style={{fontFamily: "auto"}} >
        <div className="pr-4">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>Welcome to the forbidden forest. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website, participate in our crypto airdrops, and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">2. Data We Collect</h2>
            <p>We collect and process the following data when you use our website and participate in our airdrops:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Account information from Discord, Twitter, or Telegram, including username, user ID, email address (if provided by the platform), and profile picture</li>
              <li>Cryptocurrency wallet addresses</li>
              <li>Transaction data related to airdrops</li>
              <li>Usage data, including how you interact with our website</li>
              <li>Communication data, including any messages you send us</li>
              <li>IP address and device information</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>To verify your eligibility for airdrops</li>
              <li>To distribute cryptocurrency tokens through airdrops</li>
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service or upcoming airdrops</li>
              <li>To allow you to participate in interactive features of our website</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues and potential fraud</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">4. Data Sharing and Transfer</h2>
            <p>We do not sell, trade, or rent your personal identification information to others. However, we may share data in the following circumstances:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>With blockchain networks when processing airdrop transactions (note that blockchain transactions are public)</li>
              <li>With service providers who assist us in operating our website and conducting airdrops</li>
              <li>If required by law or to respond to legal process</li>
              <li>To protect our rights, property, or safety, or that of our users or others</li>
            </ul>
          </section>


        </div>
      </ScrollArea>
    </div>
    </div>
  )
}