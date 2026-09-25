import { createClient } from '@/lib/supabase/server';
import LogoutButton from '@/components/auth/logoutBtn';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return(
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.email}!</p>
            <LogoutButton />
        </div>
    )
}