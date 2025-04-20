"use client"
import { HandleLoginType, HandleRegisterType, authForm, typingAuthForm } from "@/db/type";
import Image from "next/image";
import { Report } from "notiflix";
import { ChangeEvent, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type Props = {
    formType: string;
    postRegister?: any;
    postLogin?: any;
};

export default function FormAuth({ formType, postRegister, postLogin }: Props) {
    const [form, setForm] = useState<authForm>({ name: '', username: '', email: '', password: '' });
    const [formTyping, setFormTyping] = useState<typingAuthForm>({ nameTyping: false, usernameTyping: false, emailTyping: false, passwordShowing: false });
    const [pending, setPending] = useState<boolean>(false);

    const handleRegister: HandleRegisterType = async () => {
        const result = await postRegister(form);
        setPending(false);
        if (result === "success") {
            Report.success(
                'Sukses',
                'Berhasil register',
                'Ok',
                () => {
                    // Redirect to '/wishlist' after the user clicks "Ok"
                    window.location.href = '/login';
                }
            );
        }
    }

    const handleLogin: HandleLoginType = async () => {
        await postLogin(form);
        setPending(false);
    }
    return (
        <form>
            {
                formType === 'register'
                &&
                (
                    <>
                        <div className="pb-1">
                            <label htmlFor="name" className="opacity-90 text-sm">
                                Name
                            </label>
                        </div>
                        <div className="relative pb-4">
                            <input
                                type="text"
                                id="name"
                                value={form.name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setForm({ ...form, name: e.target.value });

                                    if (e.target.value !== "" || !e.target.value) {
                                        setFormTyping({ ...formTyping, nameTyping: true });
                                    }
                                }}
                                className="focus:bg-blue-100 focus:outline-none p-4 border-solid border-slate-800 rounded-lg h-10 w-full border-opacity-10 pr-10"
                                style={{ borderWidth: 1 }}
                            />

                            {
                                formTyping.nameTyping && form.name !== ''
                                &&
                                (
                                    <div className="absolute right-3" onClick={() => setForm({ ...form, name: "" })} style={{ top: '0.35rem' }}>
                                        <Image
                                            src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"
                                            alt="My SVG Image"
                                            width={28}
                                            height={28}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </>
                )
            }
            {
                formType === 'register'
                &&
                (
                    <>
                        <div className="pb-1">
                            <label htmlFor="username" className="opacity-90 text-sm">
                                Username
                            </label>
                        </div>
                        <div className="relative pb-4">
                            <input
                                type="text"
                                id="username"
                                value={form.username}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setForm({ ...form, username: e.target.value });

                                    if (e.target.value !== "" || !e.target.value) {
                                        setFormTyping({ ...formTyping, usernameTyping: true });
                                    }
                                }}
                                className="focus:bg-blue-100 focus:outline-none p-4 border-solid border-slate-800 rounded-lg h-10 w-full border-opacity-10 pr-10"
                                style={{ borderWidth: 1 }}
                            />

                            {
                                formTyping.usernameTyping && form.username !== ''
                                &&
                                (
                                    <div className="absolute right-3" onClick={() => setForm({ ...form, username: "" })} style={{ top: '0.35rem' }}>
                                        <Image
                                            src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"
                                            alt="My SVG Image"
                                            width={28}
                                            height={28}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </>

                )
            }
            <div className="pb-1">
                <label htmlFor="email" className="opacity-90 text-sm">
                    Email
                </label>
            </div>
            <div className="relative pb-4">
                <input
                    type="text"
                    id="email"
                    value={form.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setForm({ ...form, email: e.target.value });

                        if (e.target.value !== "" || !e.target.value) {
                            setFormTyping({ ...formTyping, emailTyping: true });
                        }
                    }}
                    className="focus:bg-blue-100 focus:outline-none p-4 border-solid border-slate-800 rounded-lg h-10 w-full border-opacity-10 pr-10"
                    style={{ borderWidth: 1 }}
                />

                {
                    formTyping.emailTyping && form.email !== ''
                    &&
                    (
                        <div className="absolute right-3" onClick={() => setForm({ ...form, email: "" })} style={{ top: '0.35rem' }}>
                            <Image
                                src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M19.4244 4.57557C23.5257 8.67683 23.5247 15.3242 19.4244 19.4244C15.3242 23.5247 8.67683 23.5257 4.57557 19.4244C0.474315 15.3232 0.475305 8.67584 4.57557 4.57557C8.67584 0.475305 15.3232 0.474315 19.4244 4.57557ZM10.5151 12L8.28778 14.2273C7.87774 14.6374 7.87774 15.3022 8.28778 15.7122C8.69782 16.1223 9.36263 16.1223 9.77267 15.7122L12 13.4849L14.2273 15.7122C14.6374 16.1223 15.3022 16.1223 15.7122 15.7122C16.1223 15.3022 16.1223 14.6374 15.7122 14.2273L13.4849 12L15.7122 9.77267C16.1223 9.36263 16.1223 8.69782 15.7122 8.28778C15.3022 7.87774 14.6374 7.87774 14.2273 8.28778L12 10.5151L9.77267 8.28778C9.36263 7.87774 8.69782 7.87774 8.28778 8.28778C7.87774 8.69782 7.87774 9.36263 8.28778 9.77267L10.5151 12Z' fill='%238E919B'/%3E%3C/svg%3E"
                                alt="My SVG Image"
                                width={28}
                                height={28}
                            />
                        </div>
                    )
                }
            </div>

            <div className="pb-1">
                <label htmlFor="password" className="opacity-90 text-sm">
                    Password
                </label>
            </div>
            <div className="relative pb-4">
                <input
                    type={formTyping.passwordShowing ? "text" : "password"}
                    id="password"
                    value={form.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setForm({ ...form, password: e.target.value });
                    }}
                    className="focus:bg-blue-100 focus:outline-none p-4 border-solid border-slate-800 rounded-lg h-10 w-full border-opacity-10 pr-10"
                    style={{ borderWidth: 1 }}
                />

                {
                    !formTyping.passwordShowing
                        ?
                        <div className="absolute right-3" style={{ top: '0.35rem' }}>

                            <FaRegEyeSlash
                                size={24}
                                onClick={() => setFormTyping({ ...formTyping, passwordShowing: true })}
                                style={{ cursor: 'pointer', color: "gray" }}
                            />

                        </div>
                        :
                        <div className="absolute right-3" style={{ top: '0.43rem' }}>
                            <FaRegEye
                                size={22}
                                onClick={() => setFormTyping({ ...formTyping, passwordShowing: false })}
                                style={{ cursor: 'pointer', color: "gray" }}
                            />
                        </div>
                }
            </div>
            {
                pending
                    ?

                    <div className="h-12 rounded-xl justify-center content-center items-center cursor-pointer flex mt-4 bg-blue-600 opacity-40 disabled">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                    :
                    <div className="h-12 bg-blue-700 rounded-xl justify-center content-center items-center cursor-pointer flex mt-4 hover:bg-blue-500" onClick={formType === 'register' ? () => { handleRegister(); setPending(true); } : () => { handleLogin(); setPending(true); }}>
                        <span className="font-bold text-white cursor-pointer">{formType === 'register' ? "Daftar" : "Masuk"}</span>
                    </div>
            }
        </form>
    )
}