import Header from"@/components/Header";
import { Outlet } from "react-router";

function DefaultLayout() {
    return (
        <div>
            <Header/>
            <main className="p-6">
                <Outlet/>
            </main>
        </div>
    )
}
export default DefaultLayout;