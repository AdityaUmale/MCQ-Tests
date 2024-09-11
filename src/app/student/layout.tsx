import { StudentSidebar } from "./../components/StudentSidebar";

export default function StudentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="lg:flex h-screen">
      <StudentSidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );      
}

