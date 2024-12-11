
import { VStack } from "@/components/ui/vstack";
import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, ButtonText } from "@/components/ui/button";
import { useEffect } from "react";
import Input from "@/components/input";

const addAccountSchema = z.object({
    name: z.string().min(1, 'Insira um nome.'),
    tap: z.coerce.number().min(1, 'Insira um valor válido para o TAP.'),
    cap: z.coerce.number().min(1, 'Insira um número válido para o CAP.'),
})

type AddAccountData = z.infer<typeof addAccountSchema>

export default function Accounts() {

    const addAccountForm = useForm<AddAccountData>({
        resolver: zodResolver(addAccountSchema)
    })

    const { handleSubmit, formState: { errors } } = addAccountForm

    const onSubmit = (data: AddAccountData) => {
        console.log(`data =>`, data)
    }

    useEffect(() => {
        console.log(`errors =>`, errors)
    }, [errors])

    return (
        <VStack className="flex-1 p-8" space="lg">
            <Stack.Screen
                options={{
                    title: 'Create Account',
                    presentation: 'modal'
                }}
            />
            <FormProvider {...addAccountForm}>
                <Input
                    name="name"
                    placeholder="Name"
                />
                <Input
                    name="tap"
                    inputMode="numeric"
                    placeholder="20%"
                />
                <Input
                    name="cap"
                    inputMode="numeric"
                    placeholder="10%"
                />
                <Button
                    onPress={handleSubmit(onSubmit)}
                >
                    <ButtonText>Salvar</ButtonText>
                </Button>
            </FormProvider>
        </VStack>
    )

}