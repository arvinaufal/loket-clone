import ClientFlashComponent from "@/components/ClientFlashComponent";
import FormAuth from "@/components/auth/formAuth";
import { MyResponse, loginFormType } from "@/db/type";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Register() {
    const postLogin = async (payload: loginFormType) => {
        "use server"
        const email: string = payload.email;
        const password: string = payload.password;

        const login = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            }
        );

        const result = (await login.json()) as MyResponse<{
            accessToken: string;
        }>;

        if (!login.ok) {
            return redirect("/login?error=" + result.message);
        }

        if (result.data) {
            cookies().set("Authorization", `Bearer ${result.data.accessToken}`)
        }

        return redirect("/");
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
                                    <span className="font-bold text-xl">Masuk ke akunmu</span>
                                </div>
                                <div className="w-full text-center">
                                    <span className="text-sm">Tidak punya akun Loket? <Link href={'/register'} className="font-extrabold text-blue-700">Daftar</Link></span>
                                </div>
                                <ClientFlashComponent />
                            </div>
                            <div className="w-5/6 rounded-2xl shadow-lg flex flex-col">
                                <div className="p-8 flex flex-col w-full">
                                    <FormAuth formType="login" postLogin={postLogin} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}