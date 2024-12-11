import { FlatList } from "react-native"

import AccountsListItem from "./accounts-list-item";
import { Box } from "./ui/box";
import Account from "@/src/data/local/database/model/account";
import { withObservables } from "@nozbe/watermelondb/react"
import { database } from "@/src/data/local/database/config";
import { useState } from "react";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";
import { Text } from "./ui/text";
import { Button, ButtonText } from "./ui/button";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";

type AccountsListProps = {
    accounts: Account[]
}

function AccountsList({ accounts }: AccountsListProps) {

    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [currentAccount, setCurrentAccount] = useState<Account>()
    const onDeleteAccount = async () => {
        await database.write(async () => {
            await currentAccount?.markAsDeleted()
        }).finally(handleCloseDeleteDialog)

    }

    const handleCloseDeleteDialog = () => {
        setShowAlertDialog(false)
        setCurrentAccount(undefined)
    }

    return (
        <>
            <FlatList
                data={accounts}
                renderItem={({ item }) => (
                    <AccountsListItem
                        onDelete={(account) => {
                            setCurrentAccount(account)
                            setShowAlertDialog(true)
                        }}
                        account={item}
                    />)}
                ItemSeparatorComponent={() => <Box className="py-1" />}
            />
            <AlertDialog
                isOpen={showAlertDialog}
                onClose={handleCloseDeleteDialog}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent
                    className={"items-center gap-4"}
                >
                    <AlertDialogBody>
                        <VStack>
                            <Heading>
                                Deseja deletar a conta {currentAccount?.name}?
                            </Heading>
                            <Text>
                                Esta ação é irreversível!
                            </Text>
                        </VStack>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <HStack
                            space="xl"
                        >
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={handleCloseDeleteDialog}
                            >
                                <ButtonText>
                                    Não
                                </ButtonText>
                            </Button>
                            <Button
                                variant="solid"
                                action="negative"
                                onPress={onDeleteAccount}
                            >
                                <ButtonText>
                                    Sim
                                </ButtonText>
                            </Button>
                        </HStack>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )

}

const enhance = withObservables([], () => ({
    accounts: database.get<Account>('accounts').query()
}))

export default enhance(AccountsList)