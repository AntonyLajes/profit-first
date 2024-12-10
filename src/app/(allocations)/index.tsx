import { Tabs, Link } from "expo-router"

import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";

export default function Home(){

    return (
        <Center className="flex-1">
            <Tabs.Screen options={{title: "Allocations"}}/>
            <Text>Home</Text>
            <Link
                href={"/new-allocation"}
            >
                <Text>
                    Go to New Allocation
                </Text>
            </Link>
        </Center>
    )

}