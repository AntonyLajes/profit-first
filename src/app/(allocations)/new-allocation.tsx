import { Tabs, router } from "expo-router"

import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import { database } from "@/src/data/local/database/config";
import Allocations from "@/src/data/local/database/model/allocations";
import { withObservables } from "@nozbe/watermelondb/react";
import Account from "@/src/data/local/database/model/account";
import { HStack } from "@/components/ui/hstack";

type NewAllocationProps = {
    accounts: Account[]
}

function NewAllocation({ accounts }: NewAllocationProps) {

    const [income, setIncome] = useState('0')
    const db = database

    const onCreateIncome = async () => {
        await db.write(async () => {
            await db.get<Allocations>('allocations').create((allocation) => {
                allocation.income = Number.parseFloat(income)
            })
        })

        router.back()
    }

    return (
        <VStack className="flex-1 p-8 justify-between" space="md">
            <Tabs.Screen options={{ title: "New Allocation" }} />
            <VStack
                space="sm"
            >
                <Text>
                    Income:
                </Text>
                <Input>
                    <InputField placeholder="Income" value={income} onChangeText={setIncome} />
                </Input>
                {
                    accounts.map((account) => (
                        <HStack
                            key={account.id}
                            className="justify-between"
                        >
                            <HStack
                                space="md"
                            >
                                <Text>
                                    {account.name}: {account.cap}%
                                </Text>
                            </HStack>
                            <Text>
                                R${Number.parseFloat(income) * account.cap / 100}
                            </Text>
                        </HStack>
                    ))
                }
            </VStack>
            <Button
                onPress={onCreateIncome}
            >
                <ButtonText>
                    Salvar
                </ButtonText>
            </Button>
        </VStack>
    )
}

const enhance = withObservables([], () => ({
    accounts: database.get<Account>('accounts').query()
}))

export default enhance(NewAllocation)