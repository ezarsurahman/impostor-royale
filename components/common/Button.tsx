interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type: "blue" | "yellow";
    children: React.ReactNode;
}

export const Button = ({ type, children, className, ...props }: ButtonProps) => {
    const buttonStyles = type === "blue" 
        ? "bg-gradient-to-b from-[#7acdff] to-[#1a6ed2] hover:scale-[1.1] transition ease-in-out border-2 border-[#1a6ed2]" 
        : "bg-gradient-to-b from-[#ffe27a] to-[#d28f1a] hover:scale-[1.1] transition ease-in-out border-2 border-[#d28f1a]";

    return (
        <button className={`${className} cursor-pointer px-6 py-3 rounded-lg font-cr ${buttonStyles} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`} {...props}>
            {children}
        </button>
    );
}