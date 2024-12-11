
import { VStack } from "@/components/ui/vstack";
import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, ButtonText } from "@/components/ui/button";
import { useEffect } from "react";
import Input from "@/components/input";
import { database } from "@/src/data/local/database/config";
import Account from "@/src/data/local/database/model/account";

const addAccountSchema = z.object({
    name: z.string().min(1, 'Insira um nome.'),
    tap: z.coerce.number().min(1, 'Insira um valor válido para o TAP.'),
    cap: z.coerce.number().min(1, 'Insira um número válido para o CAP.'),
})

type AddAccountData = z.infer<typeof addAccountSchema>
type ParamsProps = {
    id?: string
}

export default function Accounts() {

    const addAccountForm = useForm<AddAccountData>({
        resolver: zodResolver(addAccountSchema)
    })
    const { handleSubmit, reset, getValues } = addAccountForm

    const { id } = useLocalSearchParams<ParamsProps>()
    const mode = id ? 'Update' : 'Create'

    const db = database

    const onCreateAccount = async (data: AddAccountData) => {
        await db.write(async () => {
            await db.get<Account>('accounts').create(account => {
                account.name = data.name
                account.cap = data.cap
                account.tap = data.tap
            })
        })
        router.back()
    }

    const onUpdateAccount = async (data: AddAccountData) => {
        if(!id) return
        await db.write(async () => {
            const account = await db.get<Account>('accounts').find(id)

            account.update((_account) => {
                _account.name = data.name
                _account.cap = data.cap
                _account.tap = data.tap
            })
        })
        router.back()
    }

    useEffect(() => {
        if(!id) return
        const fetchAccount = async () => {
            const account = await database.get<Account>('accounts').find(id)
            reset({
                name: account.name,
                cap: account.cap,
                tap: account.tap,
            })
            console.log(`getValues =>`, getValues())
        }
        fetchAccount()
    }, [])

    return (
        <VStack className="flex-1 p-8" space="lg">
            <Stack.Screen
                options={{
                    title: `${mode} Account`,
                    presentation: 'modal'
                }}
            />
            <FormProvider {...addAccountForm}>
                <VStack
                    className="flex-1 justify-between"
                >
                    <VStack
                        space="md"
                    >
                        <Input
                            name="name"
                            placeholder="Name"
                        />
                        <Input
                            name="cap"
                            inputMode="numeric"
                            placeholder="20%"
                        />
                        <Input
                            name="tap"
                            inputMode="numeric"
                            placeholder="10%"
                        />
                    </VStack>
                    <Button
                        onPress={handleSubmit(mode === "Create" ? onCreateAccount : onUpdateAccount)}
                    >
                        <ButtonText>Salvar</ButtonText>
                    </Button>
                </VStack>
            </FormProvider>
        </VStack>
    )

}