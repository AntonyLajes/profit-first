import { FlatList } from "react-native"
import AllocationsListItem from "./allocations-list-item"
import Allocations from "@/src/data/local/database/model/allocations"
import { withObservables } from "@nozbe/watermelondb/react"
import { database } from "@/src/data/local/database/config"
import { Q } from "@nozbe/watermelondb"
import { Box } from "./ui/box"

type AllocationsListProps = {
    allocations: Allocations[]
}

function AllocationsList({ allocations }: AllocationsListProps) {

    return (
        <FlatList
            data={allocations}
            renderItem={({item}) => <AllocationsListItem allocation={item}/>}
            ItemSeparatorComponent={() => <Box className="py-1"/>}
        />
    )

}

const enhance = withObservables([], () => ({
    allocations: database.get<Allocations>('allocations').query(Q.sortBy('created_at', Q.asc))
}))

export default enhance(AllocationsList)