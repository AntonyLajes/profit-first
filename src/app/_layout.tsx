import { Tabs } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons"

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function Layout() {
    return (
        <GluestackUIProvider mode="light">
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen
                    name="(allocations)"
                    options={{
                        title: "Allocations",
                        tabBarIcon: ({size, color}) => <MaterialIcons name="account-tree" color={color} size={size}/>
                    }}
                />
                <Tabs.Screen
                    name="accounts"
                    options={{ 
                        title: "Accounts",
                        tabBarIcon: ({size, color}) => <MaterialIcons name="account-balance-wallet" color={color} size={size}/>
                     }}
                />
            </Tabs>
        </GluestackUIProvider>
    )
}