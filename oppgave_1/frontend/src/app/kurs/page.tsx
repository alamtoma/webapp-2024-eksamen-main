import RootLayout from "../layout";
import Courses from "@/components/Courses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CoursesPage() {
    return (
        <>
            <RootLayout>
                <main className="h-full">
                    <Navbar />
                    <Courses />
                    <Footer />
                </main>
            </RootLayout>
        </>
    )
}