import Header from "@/components/header";


export default async function Component() {
  return (
    
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="min-w-full min-h-full w-auto h-auto z-[-1] object-cover"
        >
          <source src="/videos/commingsoon.mp4" type="video/mp4" />
        </video>
      </div>
      <Header />
      <main className="flex flex-col items-center min-h-[calc(100vh-80px)] px-6 md:px-12 text-white">
        <h1 className="text-4xl md:text-6xl font-bold">Airdrop</h1>
      </main>
    </div>
  );
}

function LogInIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
