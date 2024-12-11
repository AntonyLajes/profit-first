import { FlatList } from "react-native"

import { HStack } from "./ui/hstack";
import AccountsListItem from "./accounts-list-item";
import { Box } from "./ui/box";

export default function AccountsList(){

    return (
        <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={() => <AccountsListItem/>}
            ItemSeparatorComponent={() => <Box className="py-1" />}
        />
    )

}