"use client"
type Props = {
    logout?: any;
};

export default function LogoutButton({ logout }: Props) {
    return (
        <div onClick={() => logout()} className='h-10 rounded-lg border flex justify-center content-center border-rose-600 items-center w-1/2 bg-rose-600 hover:bg-rose-400 hover:border-rose-400 cursor-pointer' >
            <span className='text-white font-normal'>Log out</span>
        </div>
    )
}
