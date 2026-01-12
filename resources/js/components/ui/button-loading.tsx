import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export default function ButtonLoading({text = "Envoyer", logo, isLoading = false, textLoader = "Chargement...", loaderLogo}: {text: string; logo?: any ; isLoading?: boolean, textLoader?: string, loaderLogo?: any}) {
    return (
        <Button>
            {isLoading ? (
                <>
                    {loaderLogo ? (
                        <>
                        {loaderLogo}
                        </>
                    ) :
                        (
                            <Spinner />
                        )
                    }
                    {textLoader}
                </>
            ) :
                (
                    <>
                        {text}
                        {logo ? (
                            <>
                            {logo}
                            </>
                        ):
                            <>
                            <Send/>
                            </>
                        }
                    </>
                )
            }

        </Button>
    )
}
