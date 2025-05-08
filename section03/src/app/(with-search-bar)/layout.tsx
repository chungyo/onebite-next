import {ReactNode} from 'react';
import SearchBar from "@/app/(with-search-bar)/searchbar";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div>
            <SearchBar />
            <div>{children}</div>
        </div>
    )
}