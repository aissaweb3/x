import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
//import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Briefcase, Award, TrendingUp } from 'lucide-react'

// Mock data
const stats = [
  { title: "Total Users", value: "1,234", icon: Users },
  { title: "Active Tasks", value: "56", icon: Briefcase },
  { title: "Total NFTs", value: "789", icon: Award },
  { title: "Total XP", value: "1,234,567", icon: TrendingUp },
]

const latestUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", xp: 1500 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", xp: 1200 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", xp: 900 },
]

const latestTasks = [
  { id: 1, title: "Complete onboarding", usersCompleted: 45, totalUsers: 100 },
  { id: 2, title: "Finish tutorial", usersCompleted: 30, totalUsers: 100 },
  { id: 3, title: "Submit first project", usersCompleted: 20, totalUsers: 100 },
]

const nfts = [
  { id: 1, name: "Cosmic Cat #1", owner: "0x1234...5678" },
  { id: 2, name: "Digital Dog #42", owner: "0x8765...4321" },
  { id: 3, name: "Ethereal Elephant #7", owner: "0x2468...1357" },
]

const xpData = [
  { name: 'Beginner', users: 500, avgXP: 100 },
  { name: 'Intermediate', users: 300, avgXP: 500 },
  { name: 'Advanced', users: 200, avgXP: 1000 },
  { name: 'Expert', users: 100, avgXP: 2000 },
]

export default function Client() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav>
            <Button variant="ghost">Users</Button>
            <Button variant="ghost">Tasks</Button>
            <Button variant="ghost">NFTs</Button>
            <Button variant="ghost">Statistics</Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Latest Users</CardTitle>
              <CardDescription>Recently joined users and their XP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {latestUsers.map(user => (
                  <div key={user.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="text-sm font-medium">{user.xp} XP</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Tasks</CardTitle>
              <CardDescription>Recent tasks and completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {latestTasks.map(task => (
                  <div key={task.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{task.title}</span>
                      <span className="text-sm font-medium">{task.usersCompleted}/{task.totalUsers}</span>
                    </div>
                    <Progress value={(task.usersCompleted / task.totalUsers) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>NFTs and Owners</CardTitle>
            <CardDescription>Latest NFTs minted and their current owners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nfts.map(nft => (
                <div key={nft.id} className="flex justify-between items-center">
                  <div className="font-medium">{nft.name}</div>
                  <div className="text-sm text-muted-foreground">{nft.owner}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User XP Distribution</CardTitle>
            <CardDescription>Average XP and user count by experience level</CardDescription>
          </CardHeader>
          <CardContent>
            {/*<div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={xpData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="users" fill="#8884d8" name="Number of Users" />
                  <Bar yAxisId="right" dataKey="avgXP" fill="#82ca9d" name="Average XP" />
                </BarChart>
              </ResponsiveContainer>
            </div>*/}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function Progress({value}: {value: number}) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative w-full h-3 rounded-full bg-muted">
          <div className="absolute left-0 top-0 h-full rounded-full bg-primary" style={{ width: "75%" }} />
        </div>
        <div className="text-sm font-medium text-primary-foreground">{value}%</div>
      </div>
    )
  }