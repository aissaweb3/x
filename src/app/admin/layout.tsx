import AdminHeader from "@/components/adminHeader";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <AdminHeader />
    {children}
    </>
    
        
  );
}
