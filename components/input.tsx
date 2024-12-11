import { useFormContext, useController } from "react-hook-form"

import { Input as GSInput, InputField } from "./ui/input";
import { ComponentProps } from "react";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

interface InputProps extends ComponentProps<typeof InputField> {
    name: string
}

export default function Input({ name, ...props }: InputProps) {

    const { control, formState: { errors } } = useFormContext()
    const { field } = useController({
        control,
        name
    })

    const fieldError = errors[name]

    return (
        <VStack>
            <GSInput
                isInvalid={!!fieldError}
            >
                <InputField
                    value={String(field.value)}
                    onChangeText={field.onChange}
                    {...props}
                />
            </GSInput>
            {
                fieldError && (
                    <Text
                        className={"text-error-500"}
                    >
                        {String(fieldError.message)}
                    </Text>
                )
            }
        </VStack>
    )

}