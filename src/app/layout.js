import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import CustomNavbar from "@/components/CustomNavbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import userContext from "@/context/userContext";
import UserProvider from "@/context/userProvider";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900">
    <UserProvider>
    <ToastContainer/>
        <CustomNavbar/>
       <div className="mt-2"> {children}</div>
       <Footer/>
    </UserProvider>
        </body>
    </html>
  );
}
