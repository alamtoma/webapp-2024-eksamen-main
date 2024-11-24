import RootLayout from "@/app/layout";
import Course from "@/components/Course";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CoursePage() {
    return (
        <>
            <RootLayout>
                <main className="h-full">
                    <Navbar />
                    <Course />
                    <Footer />
                </main>
            </RootLayout>
        </>
    )
}