
export const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex justify-center item-center">
        <div className="flex justify-center">
            {children}
        </div>
    </div>
}