import { Card } from "@/components/ui/card"

export function ShimmerEffect() {
    return <>
        
            {
                Array.from({ length: 12 }).map((_, index) => {
                    return <Card
                        key={index}
                        className="max-w-96 h-36 bg-gray-200 cursor-pointer animate-pulse p-5"
                    >
                    </Card>
                })
            }
        
    </>
}