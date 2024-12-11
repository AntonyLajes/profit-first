import { Tabs, router } from "expo-router"

import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import { database } from "@/src/data/local/database/config";
import Allocations from "@/src/data/local/database/model/allocations";

export default function NewAllocation() {

    const [income, setIncome] = useState('')
    const db = database

    const onCreateIncome =async () => {
        await db.write(async () => {
            await db.get<Allocations>('allocations').create((allocation) => {
                allocation.income = Number.parseFloat(income)
            })
        })

        router.back()
    }

    return (
        <VStack className="flex-1 p-8" space="md">
            <Tabs.Screen options={{ title: "New Allocation" }} />
            <VStack
                space="sm"
            >
                <Text>
                    Income:
                </Text>
                <Input>
                    <InputField placeholder="Income" value={income} onChangeText={setIncome}/>
                </Input>
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