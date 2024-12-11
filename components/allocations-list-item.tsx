import { Text } from "./ui/text"
import Allocations from "@/src/data/local/database/model/allocations"
import { HStack } from "./ui/hstack"

type AllocationsListProps = {
    allocation: Allocations
} 

export default function AllocationsList({ allocation }: AllocationsListProps) {

    return (
        <HStack
            className="bg-white p-4 rounded-2xl justify-between"
        >
            <Text
                bold
            >
                {allocation.createdAt.toLocaleDateString()}
            </Text>
            <Text
                className="text-success-800"
            >
                R${allocation.income}
            </Text>
        </HStack>
    )

}