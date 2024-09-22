import getTokenOrBack from "@/utils/server/getTokenOrBack";
import GenerateToken from "./GenerateToken";

export default async function AdminDashboard() {
  const { token } = await getTokenOrBack({ admin: true });
  
  return (
    <div
      style={{ fontFamily: "auto" }}
      className="light flex flex-col min-h-screen bg-muted/40"
    >
      <div className="flex flex-col items-center space-y-4">
        <h1 style={{ fontFamily: "CustomFont", fontSize: "5rem" }}>
          HELLO ADMIN
        </h1>
      </div>
    </div>
  );
}
