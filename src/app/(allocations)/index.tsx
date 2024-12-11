import { Tabs, Link } from "expo-router"

import { database } from "@/src/data/local/database/config";

import { Fab, FabIcon } from "@/components/ui/fab";
import { VStack } from "@/components/ui/vstack";

import { PlusIcon } from "lucide-react-native";
import AllocationsList from "@/components/allocations-list";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

export default function Home(){

    const db = database.get('accounts')

    console.log(`db =>`, db);
    

    return (
        <VStack className="flex-1 p-8" space="md">
            <Tabs.Screen options={{title: "Allocations"}}/>
            <AllocationsList/>
            <Link
                href="/new-allocation"
                asChild
            >
                <Fab
                    size="lg"
                >
                    <FabIcon as={PlusIcon} />
                </Fab>
            </Link>
        </VStack>
    )

}