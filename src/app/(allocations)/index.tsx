import { Tabs, Link } from "expo-router"

import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { database } from "@/src/data/local/database/config";

export default function Home(){

    const db = database.get('accounts')

    console.log(`db =>`, db);
    

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