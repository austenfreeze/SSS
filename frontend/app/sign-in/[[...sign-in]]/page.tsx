import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-black p-6">
      <SignIn 
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox: "mx-auto",
            card: "bg-black border border-zinc-900 shadow-none",
            headerTitle: "text-white text-2xl font-black tracking-tighter italic",
            headerSubtitle: "text-zinc-500 font-mono uppercase tracking-widest text-[10px]",
            formButtonPrimary: "bg-white text-black hover:bg-zinc-200 transition-all rounded-none text-xs uppercase tracking-widest h-11",
            socialButtonsBlockButton: "bg-black border border-zinc-800 hover:bg-zinc-900 transition-all rounded-none",
            formFieldLabel: "text-zinc-500 font-mono uppercase text-[9px] tracking-widest",
            formFieldInput: "bg-black border-zinc-800 text-white rounded-none focus:border-white transition-all",
            footerActionLink: "text-white hover:text-zinc-400 transition-colors",
            dividerLine: "bg-zinc-900",
            dividerText: "text-zinc-700 font-mono text-[9px]"
          }
        }}
      />
    </div>
  );
}