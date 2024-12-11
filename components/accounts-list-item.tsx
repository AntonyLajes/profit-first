import Account from "@/src/data/local/database/model/account";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { Pressable } from "./ui/pressable";
import { Link } from "expo-router";
import { withObservables } from "@nozbe/watermelondb/react";
import React from "react";

type AccountObservable = {
    account: Account,
}

type AccountsListItemProps = {
    account: Account,
    onDelete: (account: Account) => void
}

function AccountsListItem({ account, onDelete }: AccountsListItemProps) {

    return (
        <>
            <Link
                href={{
                    pathname: "accounts/add-account-modal",
                    params: {
                        id: account.id
                    }
                }}
                asChild

            >
                <Pressable
                    onLongPress={() => onDelete(account)}
                >
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
        </>
    )

}



const enhance = withObservables<AccountsListItemProps, AccountObservable>(['account'], ({ account }) => ({
    account: account
}))
const EnhancedAccountsListItem: React.FC<AccountsListItemProps> = enhance(AccountsListItem)
export default EnhancedAccountsListItem