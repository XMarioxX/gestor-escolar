'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import BackButton from "./BackButton"


interface CardWrapperProps {
    label: string
    title: string
    backButtonHref: string
    backButtonLabel: string
    children: React.ReactNode
}

const CardWrapper = ({ label, title, backButtonHref, backButtonLabel, children }: CardWrapperProps) => {
    return (
        <Card className="w-full max-w-md shadow-md">
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify-center">
                    <CardTitle className="text-3xl font-semibold" > {title}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm" >{label}</CardDescription>
                </div>
            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>

        </Card>
    )
}

export default CardWrapper