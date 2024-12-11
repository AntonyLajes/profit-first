import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";

export default function AccountsListItem(){

    return (
        <HStack
            className="justify-between bg-white p-4 rounded-md"
        >
            <Heading>
                Profit
            </Heading>
            <Text>
                10%
            </Text>
            <Text>
                20%
            </Text>
        </HStack>
    )

}