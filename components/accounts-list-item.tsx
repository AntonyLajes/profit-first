import Account from "@/src/data/local/database/model/account";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { Pressable } from "./ui/pressable";
import { Link } from "expo-router";
import { withObservables } from "@nozbe/watermelondb/react";

type AccountsListItemProps = {
    account: Account
}

function AccountsListItem({ account }: AccountsListItemProps) {

    return (
        <Link
            href={{
                pathname: "accounts/add-account-modal",
                params: {
                    id: account.id
                }
            }}
            asChild

        >
            <Pressable>
                <HStack
                    className="justify-between bg-white p-4 rounded-md"
                >
                    <Heading>
                        {account.name}
                    </Heading>
                    <Text>
                        {account.cap}%
                    </Text>
                    <Text>
                        {account.tap}%
                    </Text>
                </HStack>
            </Pressable>
        </Link>
    )

}

const enhance = withObservables(['account'], ({account}) => ({
    account: account
}))
const EnhancedAccountsListItem = enhance(AccountsListItem)
export default EnhancedAccountsListItem