"use client";
import {useState} from "react";

export default function SearchBar() {
    const [search, setSearch] = useState<string>('');

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div>
            <input value={search} type="text" onChange={onChangeSearch} placeholder="검색어를 입력하세요." />
            <button>검색</button>
        </div>
    )
}