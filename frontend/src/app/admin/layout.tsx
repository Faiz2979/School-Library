import Header from "@/components/header";

    export default function AdminDashboard({
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
        return (
            <div className={`antialiased `}>
            <Header></Header>
            {children}
            </div>
        );
    }