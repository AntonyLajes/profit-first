import { Tabs } from "expo-router"

import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";

export default function NewAllocation(){
    return (
        <Center className="flex-1">
            <Tabs.Screen options={{title: "New Allocation"}}/>
            <Text>New Allocation</Text>
        </Center>
    )
}