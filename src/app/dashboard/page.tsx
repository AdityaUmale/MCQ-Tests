import { auth } from '@/auth'; // adjust the import path as necessary

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Welcome to your dashboard, {session?.user?.name}</h1>
      <p>Your role is: {session?.user?.role}</p>
      <p>Your location is: {session?.user?.location}</p>
      {/* Rest of your dashboard content */}
    </div>
  );
}