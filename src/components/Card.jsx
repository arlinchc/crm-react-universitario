function Card({ title, children }) {
    return(
        <div className="bg-[#1a1a32] text-white shadow-none border-none">
            {title && (
                <h3 className="text-lg font-semibold mb-4">
                    {title}
                </h3>
            )}
            {children}
        </div>            
    )
}
export default Card