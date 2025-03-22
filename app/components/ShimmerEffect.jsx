
export function ShimmerEffect() {
    return <>
        
            {
                Array.from({ length: 12 }).map((_, index) => {
                    return <div
                        key={index}
                        className="max-w-96 h-36 bg-gray-200 cursor-pointer animate-pulse p-5"
                    >
                    </div>
                })
            }
        
    </>
}