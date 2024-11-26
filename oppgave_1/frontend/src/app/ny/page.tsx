import Create from "@/components/Create";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CreatePage() {
    return (
        <> 
            <main className="h-full mx-16">
                <Navbar />
                <Create />
                <Footer />
            </main>          
        </>
    )
}