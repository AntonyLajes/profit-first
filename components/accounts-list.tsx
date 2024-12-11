import { FlatList } from "react-native"

import AccountsListItem from "./accounts-list-item";
import { Box } from "./ui/box";
import Account from "@/src/data/local/database/model/account";
import { withObservables } from "@nozbe/watermelondb/react"
import { database } from "@/src/data/local/database/config";

type AccountsListProps = {
    accounts: Account[]
}

function AccountsList({ accounts }: AccountsListProps){

    return (
        <FlatList
            data={accounts}
            renderItem={({item}) => <AccountsListItem account={item}/>}
            ItemSeparatorComponent={() => <Box className="py-1" />}
        />
    )

}

const enhance = withObservables([], () => ({
    accounts: database.get<Account>('accounts').query()
}))

export default enhance(AccountsList)