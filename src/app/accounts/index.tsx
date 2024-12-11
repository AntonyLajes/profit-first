
import { Link, Tabs } from "expo-router"

import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Fab, FabIcon } from "@/components/ui/fab";
import AccountsList from "@/components/accounts-list";

import { PlusIcon } from "lucide-react-native"
import { useEffect, useState } from "react";
import { database } from "@/src/data/local/database/config";
import Account from "@/src/data/local/database/model/account";

export default function Accounts() {

    return (
        <VStack className="flex-1 p-8" space="md">
            <Tabs.Screen options={{ title: "Accounts" }} />
            <HStack
                className="justify-between px-4"
            >
                <Text>
                    Name
                </Text>
                <Text>
                    CAP
                </Text>
                <Text>
                    TAP
                </Text>
            </HStack>
            <AccountsList />
            <Link
                href="accounts/add-account-modal"
                asChild
            >
                <Fab
                    size="lg"
                    onPress={() => console.log("Cliquei no botão")}
                >
                    <FabIcon as={PlusIcon} />
                </Fab>
            </Link>
        </VStack>
    )

}