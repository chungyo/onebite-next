import {useRouter} from "next/router";

export default function Page() {
    const router = useRouter();

    console.log(router)
    return <h1>search</h1>
}