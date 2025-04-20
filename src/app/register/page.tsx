import ClientFlashComponent from "@/components/ClientFlashComponent";
import FormAuth from "@/components/auth/formAuth";
import { MyResponse, registerFormType } from "@/db/type";

import Link from "next/link";
import { redirect } from "next/navigation";

export default function Register() {
    const postRegister = async (payload: registerFormType) => {
        "use server"
        const name: (string | undefined) = payload.name;
        const username: string = payload.username;
        const email: string = payload.email;
        const password: string = payload.password;

        const register = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password
                }),
            }
        );

        const result = (await register.json()) as MyResponse;

        if (!register.ok) {
            return redirect("/register?error=" + result.message);
        }

        // return redirect("/login")
        return "success"
        
    }
    return (
        <section className=" min-h-screen w-screen">
            <div className="flex flex-col w-full h-screen">

                <div className="flex w-full justify-center my-5 h-10">
                    <img src="https://www.loket.com/web/assets/img/logo-loket-blue.svg" alt="" />
                </div>
                <div className=" flex flex-row w-full h-full px-4">
                    <div className="flex flex-col justify-center content-center items-center w-1/2">
                        <div className="flex flex-col justify-center content-center items-center ml-48">
                            <div className="">
                                <img src="https://www.loket.com/web/assets/img/auth.svg" alt="" style={{ width: 300 }} />
                            </div>
                            <div className="flex flex-col w-full items-center justify-center text-center">
                                <div className="">
                                    <span className="text-lg font-bold text-slate-950">Tidak lagi ketinggalan event dan film favoritmu</span>
                                </div>
                                <div className="w-4/5 pt-2">
                                    <span className="text-sm">Gabung dan rasakan kemudahan bertransaksi dan mengelola event di Loket.</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className=" flex flex-col justify-center content-center items-center w-1/2 mb-20">
                        <div className="container w-2/3 h-2/3  flex flex-col justify-center content-center items-center mr-48">
                            <div className="w-full mx-4 my-4">
                                <div className="w-full text-center">
                                    <span className="font-bold text-xl">Buat akun Loket kamu</span>
                                </div>
                                <div className="w-full text-center">
                                    <span className="text-sm">Sudah punya akun? <Link href={'/login'} className="font-extrabold text-blue-700">Masuk</Link></span>
                                </div>
                                <ClientFlashComponent />
                            </div>
                            <div className="w-5/6 rounded-2xl shadow-lg flex flex-col">
                                <div className="p-8 flex flex-col w-full">
                                    <FormAuth formType="register" postRegister={postRegister} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}